import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

console.log(Deno.env.get("QUICKBOOKS_CLIENT_ID"))

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      req.headers.get("Authorization")?.split(" ")[1] ?? ""
    );

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { business_id } = await req.json();

    // Get the integration credentials
    const { data: integration, error: integrationError } = await supabaseClient
      .from('business_integrations')
      .select('*')
      .eq('business_id', business_id)
      .eq('integration_type', 'quickbooks')
      .single();

    if (integrationError || !integration) {
      throw new Error("QuickBooks integration not found");
    }

    // Refresh token if needed
    if (new Date(integration.credentials.expires_at) < new Date()) {
      const refreshResponse = await fetch("https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${Deno.env.get("QUICKBOOKS_CLIENT_ID")}:${Deno.env.get("QUICKBOOKS_CLIENT_SECRET")}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: integration.credentials.refresh_token,
        }),
      });

      if (!refreshResponse.ok) {
        throw new Error("Failed to refresh token");
      }

      const tokens = await refreshResponse.json();
      
      // Update stored credentials
      await supabaseClient
        .from('business_integrations')
        .update({
          credentials: {
            ...integration.credentials,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
          },
        })
        .eq('id', integration.id);
    }

    // Fetch financial data from QuickBooks
    const realmId = integration.credentials.realm_id;
    const response = await fetch(
      `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/reports/ProfitAndLoss`,
      {
        headers: {
          Authorization: `Bearer ${integration.credentials.access_token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch QuickBooks data");
    }

    const financialData = await response.json();

    // Update the business listing with verified data
    const { error: updateError } = await supabaseClient
      .from('business_listings')
      .update({
        api_verified_data: {
          source: 'quickbooks',
          last_updated: new Date().toISOString(),
          profit_and_loss: financialData,
        },
      })
      .eq('id', business_id);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, data: financialData }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("QuickBooks data fetch error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
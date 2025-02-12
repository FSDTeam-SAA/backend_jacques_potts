import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const shop = url.searchParams.get("shop");
    const state = url.searchParams.get("state");

    if (!code || !shop) {
      throw new Error("Missing required parameters");
    }

    console.log("Received Shopify callback with code and shop:", { code, shop });

    const shopifyClientId = Deno.env.get("SHOPIFY_CLIENT_ID");
    const shopifyClientSecret = Deno.env.get("SHOPIFY_CLIENT_SECRET");

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: shopifyClientId,
        client_secret: shopifyClientSecret,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("Received token data from Shopify");

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Store the integration data
    const { data: integrationData, error: integrationError } = await supabaseClient
      .from("business_integrations")
      .insert({
        integration_type: "shopify",
        credentials: {
          access_token: tokenData.access_token,
          shop_domain: shop,
        },
        status: "verified",
        verified_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (integrationError) {
      console.error("Error storing integration:", integrationError);
      throw integrationError;
    }

    console.log("Successfully stored Shopify integration");

    // Redirect back to the application
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${Deno.env.get("SUPABASE_URL")}/sell?integration=shopify&status=success`,
      },
    });
  } catch (error) {
    console.error("Error in Shopify callback:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
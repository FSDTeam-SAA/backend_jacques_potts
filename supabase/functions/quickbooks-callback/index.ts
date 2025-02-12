import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const realmId = url.searchParams.get("realmId");

    if (!code || !state || !realmId) {
      throw new Error("Missing required OAuth parameters");
    }

    const clientId = Deno.env.get("QUICKBOOKS_CLIENT_ID");
    console.log(clientId);
    const clientSecret = Deno.env.get("QUICKBOOKS_CLIENT_SECRET");
    const redirectUri = `${Deno.env.get("SUPABASE_URL")}/functions/v1/quickbooks-callback`;

    // Exchange the authorization code for tokens
    const tokenResponse = await fetch("https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange authorization code for tokens");
    }

    const tokens = await tokenResponse.json();

    // Store the tokens and integration data in the database
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseClient.from("business_integrations").insert({
      integration_type: "quickbooks",
      credentials: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        realm_id: realmId,
      },
      metadata: {
        expires_in: tokens.expires_in,
        token_type: tokens.token_type,
      },
      status: "active",
    });

    // Redirect back to the application
    return new Response(null, {
      headers: {
        ...corsHeaders,
        Location: "/dashboard?integration=success",
      },
      status: 302,
    });

  } catch (error) {
    console.error("QuickBooks callback error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
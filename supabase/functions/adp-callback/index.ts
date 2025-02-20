import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    console.log("Received ADP callback with code:", code);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Exchange the code for access token
    const tokenResponse = await fetch("https://api.adp.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: Deno.env.get("ADP_CLIENT_ID") ?? "",
        client_secret: Deno.env.get("ADP_CLIENT_SECRET") ?? "",
        redirect_uri: `${Deno.env.get(
          "SUPABASE_URL"
        )}/functions/v1/adp-callback`,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("Token exchange successful");

    // Store the integration data
    const { error: integrationError } = await supabaseClient
      .from("business_integrations")
      .insert({
        integration_type: "adp",
        credentials: {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
        },
        status: "connected",
        verified_at: new Date().toISOString(),
      });

    if (integrationError) throw integrationError;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ADP callback:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

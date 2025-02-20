import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");

    console.log("Received IRS callback with code:", code);

    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }

    if (!code) {
      throw new Error("No code received");
    }

    // Exchange the code for an access token
    const tokenResponse = await fetch("https://api.irs.gov/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${Deno.env.get("IRS_CLIENT_ID")}:${Deno.env.get(
            "IRS_CLIENT_SECRET"
          )}`
        )}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${Deno.env.get(
          "SUPABASE_URL"
        )}/functions/v1/irs-callback`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const tokenData = await tokenResponse.json();

    // Store the integration data in Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabase
      .from("business_integrations")
      .insert({
        integration_type: "irs",
        credentials: {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: tokenData.expires_in,
        },
        status: "connected",
        verified_at: new Date().toISOString(),
      });

    if (dbError) {
      throw dbError;
    }

    // Redirect back to the application
    return new Response(null, {
      headers: {
        ...corsHeaders,
        Location: `${url.origin}/sell?integration=irs&status=success`,
      },
      status: 302,
    });
  } catch (error) {
    console.error("IRS callback error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

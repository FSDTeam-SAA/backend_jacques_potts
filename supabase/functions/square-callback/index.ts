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

    if (!code || !state) {
      throw new Error("Missing required parameters");
    }

    console.log("Received Square callback with code and state:", {
      code,
      state,
    });

    const squareClientId = Deno.env.get("SQUARE_CLIENT_ID");
    const squareClientSecret = Deno.env.get("SQUARE_CLIENT_SECRET");

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch(
      "https://connect.squareup.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${squareClientId}:${squareClientSecret}`
          )}`,
        },
        body: JSON.stringify({
          client_id: squareClientId,
          client_secret: squareClientSecret,
          code: code,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    console.log("Received token data from Square");

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Store the integration data
    const { data: integrationData, error: integrationError } =
      await supabaseClient
        .from("business_integrations")
        .insert({
          integration_type: "square",
          credentials: {
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            merchant_id: tokenData.merchant_id,
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

    console.log("Successfully stored Square integration");

    // Redirect back to the application
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: `${Deno.env.get(
          "SUPABASE_URL"
        )}/sell?integration=square&status=success`,
      },
    });
  } catch (error) {
    console.error("Error in Square callback:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

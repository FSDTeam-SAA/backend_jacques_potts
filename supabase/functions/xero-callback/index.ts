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

    console.log("Received Xero callback with code and state:", { code, state });

    if (!code || !state) {
      throw new Error("Missing code or state parameter");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Find the integration record with matching state
    const { data: integration, error: integrationError } = await supabaseClient
      .from("business_integrations")
      .select("*")
      .eq("integration_type", "xero")
      .eq("metadata->state", state)
      .single();

    if (integrationError || !integration) {
      console.error("Error finding integration:", integrationError);
      throw new Error("Invalid state parameter");
    }

    // Exchange the code for tokens
    const tokenResponse = await fetch("https://identity.xero.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${Deno.env.get("XERO_CLIENT_ID")}:${Deno.env.get("XERO_CLIENT_SECRET")}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${Deno.env.get("SUPABASE_URL")}/functions/v1/xero-callback`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for tokens");
    }

    const tokens = await tokenResponse.json();

    // Update the integration record with the tokens
    const { error: updateError } = await supabaseClient
      .from("business_integrations")
      .update({
        status: "connected",
        credentials: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_in: tokens.expires_in,
          token_type: tokens.token_type,
        },
        verified_at: new Date().toISOString(),
      })
      .eq("id", integration.id);

    if (updateError) {
      console.error("Error updating integration:", updateError);
      throw new Error("Failed to update integration");
    }

    // Redirect back to the application
    return new Response(
      null,
      {
        headers: {
          ...corsHeaders,
          "Location": `${Deno.env.get("SITE_URL")}/sell?integration=xero&status=success`,
        },
        status: 302,
      }
    );

  } catch (error) {
    console.error("Callback error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
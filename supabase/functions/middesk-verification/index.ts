import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { businessData } = await req.json();
    const MIDDESK_API_KEY = Deno.env.get("MIDDESK_API_KEY");

    if (!MIDDESK_API_KEY) {
      throw new Error("Missing Middesk API key");
    }

    console.log("Calling Middesk API with business data:", businessData);

    // Call Middesk API to verify business
    const response = await fetch("https://api.middesk.com/v1/businesses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MIDDESK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: businessData.businessName,
        tax_id: businessData.taxId,
        address: {
          street: businessData.street,
          city: businessData.city,
          state: businessData.state,
          postal_code: businessData.postalCode,
        },
      }),
    });

    const data = await response.json();
    console.log("Middesk API response:", data);

    // Store verification result in business_integrations table
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: integrationError } = await supabase
      .from("business_integrations")
      .insert({
        business_id: businessData.businessId,
        integration_type: "middesk",
        status: "completed",
        metadata: data,
        verified_at: new Date().toISOString(),
      });

    if (integrationError) {
      console.error("Error storing integration result:", integrationError);
      throw integrationError;
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Middesk verification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

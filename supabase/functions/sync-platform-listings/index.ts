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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { connectionId } = await req.json();
    const { user, error: authError } = await supabase.auth.getUser(
      req.headers.get("Authorization")?.split("Bearer ")[1] ?? ""
    );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Update last sync time
    const { error: updateError } = await supabase
      .from("external_platform_connections")
      .update({ last_sync_at: new Date().toISOString() })
      .eq("id", connectionId)
      .eq("user_id", user.id);

    if (updateError) throw updateError;

    // In a real implementation, you would:
    // 1. Fetch listings from the external platform using their API
    // 2. Transform the data to match your schema
    // 3. Insert/update the imported_listings table

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

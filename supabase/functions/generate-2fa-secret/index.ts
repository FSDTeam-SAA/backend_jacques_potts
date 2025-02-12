import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as speakeasy from "https://esm.sh/speakeasy@2.0.0";

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
    console.log("Generating 2FA secret");
    const secret = speakeasy.generateSecret({
      name: "BuyBizFast",
    });

    // Generate backup codes
    const backupCodes = Array.from({ length: 8 }, () =>
      Math.random().toString(36).substr(2, 8)
    );

    console.log("2FA secret and backup codes generated successfully");

    return new Response(
      JSON.stringify({
        secret: secret.base32,
        qrCode: secret.otpauth_url,
        backupCodes,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating 2FA secret:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate 2FA secret" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
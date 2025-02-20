import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { Configuration, PlaidApi, PlaidEnvironments } from "npm:plaid@18.1.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get user from auth header
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(authHeader.replace("Bearer ", ""));

    if (userError || !user) {
      throw new Error("Invalid user token");
    }

    // Initialize Plaid client
    const clientId = Deno.env.get("PLAID_CLIENT_ID");
    const sandboxSecret = Deno.env.get("PLAID_SANDBOX_SECRET");

    if (!clientId || !sandboxSecret) {
      console.error("Missing Plaid credentials");
      throw new Error("Missing Plaid credentials");
    }

    const configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": clientId,
          "PLAID-SECRET": sandboxSecret,
        },
      },
    });

    console.log("Initializing Plaid client");
    const plaidClient = new PlaidApi(configuration);

    // Create link token
    console.log("Creating Plaid link token for user:", user.id);
    const createTokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: user.id },
      client_name: "Buy Biz Fast",
      products: ["auth"],
      country_codes: ["US"],
      language: "en",
      webhook: `${Deno.env.get("SUPABASE_URL")}/functions/v1/plaid-webhook`,
      account_filters: {
        depository: {
          account_subtypes: ["checking", "savings"],
        },
      },
    });

    console.log("Successfully created Plaid link token");
    return new Response(
      JSON.stringify({ link_token: createTokenResponse.data.link_token }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in create-plaid-link-token:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

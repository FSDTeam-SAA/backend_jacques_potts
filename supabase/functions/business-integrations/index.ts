import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./utils/cors.ts";
import { handleYelpIntegration } from "./integrations/yelp.ts";
import { handlePlaidIntegration } from "./integrations/plaid.ts";
import { handleQuickbooksIntegration } from "./integrations/quickbooks.ts";
import { handleXeroIntegration } from "./integrations/xero.ts";
import { handleShopifyIntegration } from "./integrations/shopify.ts";
import { handleSquareIntegration } from "./integrations/square.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { integration_type, form_data } = await req.json();
    const origin = new URL(req.headers.get("origin") || req.headers.get("referer") || "").origin;
    
    console.log(`Processing ${integration_type} integration request`);
    
    let response;
    switch (integration_type) {
      case 'yelp':
        response = await handleYelpIntegration({ origin, form_data });
        break;
      case 'plaid':
        response = await handlePlaidIntegration({ origin, form_data });
        break;
      case 'quickbooks':
        response = await handleQuickbooksIntegration({ origin });
        break;
      case 'xero':
        response = await handleXeroIntegration({ origin });
        break;
      case 'shopify':
        response = await handleShopifyIntegration({ origin });
        break;
      case 'square':
        response = await handleSquareIntegration({ origin });
        break;
      default:
        throw new Error(`Unsupported integration type: ${integration_type}`);
    }

    return new Response(
      JSON.stringify(response),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Integration error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      }
    );
  }
});
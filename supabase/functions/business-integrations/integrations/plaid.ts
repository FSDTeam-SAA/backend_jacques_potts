import { corsHeaders } from "../utils/cors.ts";

export const handlePlaidIntegration = async ({ origin, form_data }: { origin: string; form_data: any }) => {
  const plaidClientId = Deno.env.get('PLAID_CLIENT_ID');
  if (!plaidClientId) {
    throw new Error('Plaid client ID not configured');
  }
  
  const state = crypto.randomUUID();
  
  return {
    authUrl: 'https://cdn.plaid.com/link/v2/stable/link.html',
    metadata: {
      client_name: 'Your Business Name',
      client_id: plaidClientId,
      env: 'sandbox',
      products: ['auth', 'transactions'],
      language: 'en',
      country_codes: ['US'],
      redirect_uri: `${origin}/auth/plaid/callback`,
      state: state
    }
  };
};
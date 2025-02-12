import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    console.log('Processing Google Business callback with state:', state);

    if (!code || !state) {
      throw new Error('Missing required parameters');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const clientId = Deno.env.get('GOOGLE_BUSINESS_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_BUSINESS_CLIENT_SECRET');

    if (!supabaseUrl || !supabaseKey || !clientId || !clientSecret) {
      throw new Error('Missing required environment variables');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get the integration record using the state parameter
    console.log('Looking up integration with state:', state);
    const { data: integrations, error: integrationError } = await supabaseClient
      .from('business_integrations')
      .select('*')
      .eq('integration_type', 'google_business');

    if (integrationError) {
      console.error('Integration lookup error:', integrationError);
      throw new Error('Failed to query integrations');
    }

    // Find the integration with matching state in metadata
    const integration = integrations.find(int => {
      try {
        return int.metadata?.state === state;
      } catch (e) {
        console.error('Error comparing state for integration:', e);
        return false;
      }
    });

    if (!integration) {
      console.error('No integration found with state:', state);
      throw new Error('Invalid state parameter or integration not found');
    }

    console.log('Found integration record:', integration.id);

    // Exchange the authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${req.headers.get('origin')}/auth/google-business/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    console.log('Token exchange response received');

    if (tokens.error) {
      console.error('Token exchange error:', tokens.error);
      throw new Error(tokens.error_description || 'Failed to exchange authorization code');
    }

    // Update the integration record with the tokens
    const { error: updateError } = await supabaseClient
      .from('business_integrations')
      .update({
        credentials: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        },
        status: 'connected',
        verified_at: new Date().toISOString(),
      })
      .eq('id', integration.id);

    if (updateError) {
      console.error('Integration update error:', updateError);
      throw new Error('Failed to update integration status');
    }

    console.log('Google Business integration completed successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Google Business callback error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during the callback processing',
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
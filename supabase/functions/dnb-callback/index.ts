import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    
    if (!code) {
      throw new Error('No authorization code received')
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://plus.dnb.com/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${Deno.env.get('DNB_CLIENT_ID')}:${Deno.env.get('DNB_CLIENT_SECRET')}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${Deno.env.get('SUPABASE_URL')}/functions/v1/dnb-callback`
      })
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Update integration status
    const { error: updateError } = await supabaseClient
      .from('business_integrations')
      .update({
        status: 'connected',
        credentials: { access_token: tokenData.access_token },
        verified_at: new Date().toISOString()
      })
      .eq('integration_type', 'dnb')
      .is('verified_at', null)

    if (updateError) {
      throw updateError
    }

    // Redirect back to application
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': `${Deno.env.get('SUPABASE_URL')}/verification-success`
      }
    })
  } catch (error) {
    console.error('Error in dnb-callback:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
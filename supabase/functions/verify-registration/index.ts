import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { verifyRegistrationResponse } from 'https://esm.sh/@simplewebauthn/server@8.3.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId, attResp } = await req.json()

    const verification = await verifyRegistrationResponse({
      response: attResp,
      expectedRPID: 'your-domain.com',
      expectedOrigin: 'https://your-domain.com',
      requireUserVerification: true,
    })

    if (verification.verified) {
      // Store the credential in your database
      const { data, error } = await supabase
        .from('user_credentials')
        .insert({
          user_id: userId,
          credential_id: Buffer.from(attResp.id).toString('base64'),
          public_key: Buffer.from(attResp.response.publicKey).toString('base64'),
        })

      if (error) throw error
    }

    return new Response(
      JSON.stringify({ verified: verification.verified }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
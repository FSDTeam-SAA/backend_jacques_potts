import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { generateRegistrationOptions } from 'https://esm.sh/@simplewebauthn/server@8.3.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()

    const options = await generateRegistrationOptions({
      rpName: 'Your App Name',
      rpID: 'your-domain.com',
      userID: userId,
      userName: userId,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    })

    return new Response(
      JSON.stringify({ options }),
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
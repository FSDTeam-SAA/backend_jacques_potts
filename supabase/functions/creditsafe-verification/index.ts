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
    const { businessData } = await req.json()
    const authHeader = req.headers.get('Authorization')

    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    console.log('Initiating company verification for business:', businessData)

    // OpenCorporates API request
    const companyResponse = await fetch(`https://api.opencorporates.com/v0.4/companies/search?q=${businessData.businessName}&api_token=${Deno.env.get('OPENCORPORATES_API_KEY')}`)

    if (!companyResponse.ok) {
      throw new Error('Failed to search company in OpenCorporates')
    }

    const searchResults = await companyResponse.json()
    console.log('OpenCorporates search results:', searchResults)

    const { error: updateError } = await supabaseClient
      .from('business_listings')
      .update({
        verification_type: 'opencorporates',
        verification_date: new Date().toISOString(),
        api_verified_data: searchResults
      })
      .eq('user_id', user.id)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ success: true, data: searchResults }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in company verification:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})

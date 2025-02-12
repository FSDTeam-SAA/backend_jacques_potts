import { corsHeaders } from '../business-integrations/utils/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    console.log('Processing Yelp business verification:', { code, state });

    const yelpApiKey = Deno.env.get('YELP_CLIENT_SECRET');
    if (!yelpApiKey) {
      throw new Error('Yelp API key not configured');
    }

    // Verify business using Yelp's Business Search API
    const verificationResponse = await fetch(
      `https://api.yelp.com/v3/businesses/search?${state}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${yelpApiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!verificationResponse.ok) {
      const errorText = await verificationResponse.text();
      console.error('Yelp API error:', errorText);
      throw new Error(`Failed to verify business with Yelp: ${errorText}`);
    }

    const verificationData = await verificationResponse.json();
    console.log('Yelp business verification successful:', verificationData);

    return new Response(JSON.stringify({
      success: true,
      data: verificationData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in Yelp verification:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
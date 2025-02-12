import { corsHeaders } from "../utils/cors.ts";

interface YelpIntegrationParams {
  origin: string;
  form_data: any;
}

export const handleYelpIntegration = async ({ origin, form_data }: YelpIntegrationParams) => {
  const yelpClientId = Deno.env.get('YELP_CLIENT_ID');
  const yelpApiKey = Deno.env.get('YELP_CLIENT_SECRET');
  
  if (!yelpApiKey || !yelpClientId) {
    throw new Error('Yelp credentials not configured');
  }
  
  console.log('Initiating Yelp integration with business data:', {
    businessName: form_data.businessName,
    location: form_data.location,
  });

  // Construct the search parameters
  const params = new URLSearchParams({
    term: form_data.businessName,
    location: form_data.location,
    limit: '1'
  });

  // Return the configuration for the API call
  return {
    authUrl: `https://api.yelp.com/v3/businesses/search?${params.toString()}`,
    metadata: {
      headers: {
        'Authorization': `Bearer ${yelpApiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    },
    note: "Verifying your business with Yelp's Business Search API"
  };
};
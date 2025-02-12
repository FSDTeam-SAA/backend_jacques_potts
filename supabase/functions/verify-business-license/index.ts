import { corsHeaders } from '../business-integrations/utils/cors.ts';

interface LicenseVerificationRequest {
  licenseNumber: string;
  businessName: string;
  state: string;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { licenseNumber, businessName, state } = await req.json() as LicenseVerificationRequest;
    console.log('Verifying business license:', { licenseNumber, businessName, state });

    // Simulate API call to state business license database
    // In production, this would integrate with actual state APIs
    const verificationResult = {
      isValid: true, // Simulated result
      verifiedAt: new Date().toISOString(),
      details: {
        businessName,
        licenseNumber,
        state,
        status: 'active',
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      }
    };

    return new Response(JSON.stringify(verificationResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('License verification error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
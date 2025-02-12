import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { documentUrl, documentType } = await req.json()
    console.log('Verifying document:', { documentUrl, documentType })

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Simulate document verification process
    // In a real implementation, this would integrate with a document verification service
    const verificationResult = {
      isValid: true,
      confidence: 0.95,
      verifiedFields: {
        documentType: documentType,
        verificationDate: new Date().toISOString(),
        status: 'verified'
      }
    }

    // Update the document status in the database
    const { error: updateError } = await supabase
      .from('property_documents')
      .update({
        verification_status: 'verified',
        verified_at: new Date().toISOString(),
      })
      .eq('document_url', documentUrl)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: verificationResult 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Document verification error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to verify document', 
        details: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 400 
      }
    )
  }
})
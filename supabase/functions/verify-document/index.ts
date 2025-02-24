import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  const url = new URL(req.url);

  // Make sure this matches the POST request from frontend
  if (req.method === "POST" && url.pathname === "/functions/v1/verify-document") {
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Process the incoming form data (i.e., file)
      const formData = await req.formData();
      const file = formData.get("file");

      if (!file) {
        return new Response(
          JSON.stringify({ error: "No file uploaded" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Initialize Supabase client
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      // Upload the file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("property_documents")
        .upload(`uploads/${file.name}`, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL of the uploaded file
      const publicUrl = supabase.storage.from("property_documents").getPublicUrl(data.path).publicURL;

      // Simulate document verification (you can replace this with your actual verification logic)
      const verificationResult = {
        isValid: true,
        confidence: 0.95,
        verifiedFields: {
          documentType: "general",
          verificationDate: new Date().toISOString(),
          status: "verified",
        },
      };

      // Optionally, save the document information in your database
      const { error: dbError } = await supabase
        .from("property_documents")
        .insert({
          document_url: publicUrl,
          verification_status: "verified",
          verified_at: new Date().toISOString(),
        });

      if (dbError) {
        throw dbError;
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: verificationResult,
          documentUrl: publicUrl,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Document verification error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to verify document",
          details: error.message,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 400,
        }
      );
    }
  }

  // Handle 404 for other routes
  return new Response("Not Found", { status: 404 });
});


// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { documentUrl, documentType } = await req.json();
//     console.log("Verifying document:", { documentUrl, documentType });

//     // Initialize Supabase client
//     const supabase = createClient(
//       Deno.env.get("SUPABASE_URL") ?? "",
//       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
//     );

//     // Simulate document verification process
//     // In a real implementation, this would integrate with a document verification service
//     const verificationResult = {
//       isValid: true,
//       confidence: 0.95,
//       verifiedFields: {
//         documentType: documentType,
//         verificationDate: new Date().toISOString(),
//         status: "verified",
//       },
//     };

//     // Update the document status in the database
//     const { error: updateError } = await supabase
//       .from("property_documents")
//       .update({
//         verification_status: "verified",
//         verified_at: new Date().toISOString(),
//       })
//       .eq("document_url", documentUrl);

//     if (updateError) {
//       throw updateError;
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: verificationResult,
//       }),
//       {
//         headers: {
//           ...corsHeaders,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Document verification error:", error);
//     return new Response(
//       JSON.stringify({
//         error: "Failed to verify document",
//         details: error.message,
//       }),
//       {
//         headers: {
//           ...corsHeaders,
//           "Content-Type": "application/json",
//         },
//         status: 400,
//       }
//     );
//   }
// });

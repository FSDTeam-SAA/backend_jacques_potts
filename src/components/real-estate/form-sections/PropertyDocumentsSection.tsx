import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import DocumentUploader from "../documents/DocumentUploader";
import DocumentList from "../documents/DocumentList";

interface PropertyDocumentsSectionProps {
  form: UseFormReturn<any>;
}

const PropertyDocumentsSection = ({ form }: PropertyDocumentsSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);

  // const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   setIsUploading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const response = await fetch('/api/upload-property-document', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload document');
  //     }

  //     const { filePath } = await response.json();
      
  //     const currentDocs = form.getValues('verified_documents') || [];
  //     form.setValue('verified_documents', [...currentDocs, {
  //       document_type: 'other',
  //       document_url: filePath,
  //       verification_status: 'pending'
  //     }]);

  //     toast.success('Document uploaded successfully');
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     toast.error('Failed to upload document');
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // const handleFileUpload = async (e) => {
  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0]);
  
  //   try {
  //     // Correct URL for the Supabase Edge Function
  //     const response = await fetch("https://uvsxosexezyafgfimklv.supabase.co/functions/v1/verify-document", {
  //       method: "POST",
  //       body: formData,
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to upload document");
  //     }
  
  //     const result = await response.json();
  //     console.log("Upload success:", result);
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //   }
  // };
  
  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
  
    try {
      const response = await fetch("https://uvsxosexezyafgfimklv.supabase.co/functions/v1/verify-document", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload document");
      }
  
      const result = await response.json();
      if (result.success) {
        console.log("Document uploaded and verified successfully:", result.documentUrl);
        // Display the document URL in your UI, or store it for later use
      } else {
        console.log("Verification failed:", result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  

  const removeDocument = (index: number) => {
    const currentDocs = form.getValues('verified_documents') || [];
    const newDocs = [...currentDocs];
    newDocs.splice(index, 1);
    form.setValue('verified_documents', newDocs);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="verified_documents"
        render={() => (
          <FormItem>
            <FormLabel>Property Documents</FormLabel>
            <div className="space-y-4">
              <DocumentList 
                documents={form.watch('verified_documents')} 
                onRemove={removeDocument}
              />
              <DocumentUploader 
                onUpload={handleFileUpload}
                isUploading={isUploading}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyDocumentsSection;
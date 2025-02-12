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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-property-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }

      const { filePath } = await response.json();
      
      const currentDocs = form.getValues('verified_documents') || [];
      form.setValue('verified_documents', [...currentDocs, {
        document_type: 'other',
        document_url: filePath,
        verification_status: 'pending'
      }]);

      toast.success('Document uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
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
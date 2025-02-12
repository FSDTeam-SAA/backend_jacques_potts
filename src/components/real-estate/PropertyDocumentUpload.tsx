import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import DocumentVerification from "@/components/verification/DocumentVerification";

interface PropertyDocumentUploadProps {
  listingId: string;
}

const PropertyDocumentUpload = ({ listingId }: PropertyDocumentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{url: string, type: string}>>([]);

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      
      if (!file) return;
      
      // Validate file type (PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File must be less than 10MB");
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property_documents')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property_documents')
        .getPublicUrl(filePath);

      // Save document reference in the database
      const { error: dbError } = await supabase
        .from('property_documents')
        .insert({
          listing_id: listingId,
          document_type: 'general',
          document_url: publicUrl,
        });

      if (dbError) throw dbError;

      setUploadedDocuments(prev => [...prev, { url: publicUrl, type: file.type }]);
      toast.success("Document uploaded successfully");
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Property Documents</h3>
      <div className="space-y-4">
        {uploadedDocuments.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium">Document {index + 1}</p>
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                View Document
              </a>
            </div>
            <DocumentVerification 
              documentUrl={doc.url} 
              documentType={doc.type}
              onVerificationComplete={(success) => {
                if (success) {
                  toast.success(`Document ${index + 1} verified successfully`);
                }
              }}
            />
          </div>
        ))}
        
        <Button
          variant="outline"
          className="w-full"
          disabled={uploading}
        >
          <label className="flex items-center justify-center gap-2 cursor-pointer w-full">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Upload Document"}
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleDocumentUpload}
              disabled={uploading}
            />
          </label>
        </Button>
        <p className="text-sm text-muted-foreground">
          Accepted formats: PDF, DOC, DOCX (max 10MB)
        </p>
      </div>
    </div>
  );
};

export default PropertyDocumentUpload;
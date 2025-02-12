import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";

interface DocumentUploaderProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isUploading: boolean;
}

const DocumentUploader = ({ onUpload, isUploading }: DocumentUploaderProps) => {
  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full"
        disabled={isUploading}
      >
        <label className="flex items-center justify-center gap-2 cursor-pointer w-full">
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {isUploading ? "Uploading..." : "Upload Document"}
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={onUpload}
            disabled={isUploading}
          />
        </label>
      </Button>
      <p className="text-sm text-muted-foreground">
        Accepted formats: PDF, DOC, DOCX (max 10MB)
      </p>
    </div>
  );
};

export default DocumentUploader;
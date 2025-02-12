import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Loader2 } from "lucide-react";

interface UploadButtonFieldProps {
  uploading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

const UploadButtonField = ({ uploading, onImageUpload, multiple }: UploadButtonFieldProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full max-w-md"
      disabled={uploading}
    >
      <label className="flex items-center justify-center gap-2 cursor-pointer w-full">
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Image className="h-4 w-4" />
        )}
        {uploading ? "Uploading..." : "Upload Images"}
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageUpload}
          disabled={uploading}
          multiple={multiple}
        />
      </label>
    </Button>
  );
};

export default UploadButtonField;
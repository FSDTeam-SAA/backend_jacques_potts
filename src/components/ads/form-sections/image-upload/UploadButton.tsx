import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Loader2 } from "lucide-react";

interface UploadButtonProps {
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton = ({ isUploading, onFileChange }: UploadButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full max-w-md"
      disabled={isUploading}
    >
      <label className="flex items-center justify-center gap-2 cursor-pointer w-full">
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Image className="h-4 w-4" />
        )}
        {isUploading ? "Uploading..." : "Upload Image"}
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          disabled={isUploading}
        />
      </label>
    </Button>
  );
};

export default UploadButton;
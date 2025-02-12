import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VirtualTourUploadProps {
  businessId: string;
  initialImages?: string[];
  onImagesUpdate: (urls: string[]) => void;
}

const VirtualTourUpload = ({ businessId, initialImages = [], onImagesUpdate }: VirtualTourUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(initialImages);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      const files = Array.from(e.target.files);
      
      if (images.length + files.length > 15) {
        toast.error("Maximum 15 images allowed");
        return;
      }

      const uploadPromises = files.map(async (file) => {
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not an image file`);
        }

        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} exceeds 5MB limit`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${businessId}/${Math.random()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from('virtual_tour_assets')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('virtual_tour_assets')
          .getPublicUrl(fileName);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesUpdate(newImages);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error(error.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesUpdate(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={url} className="relative group">
            <img
              src={url}
              alt={`Tour image ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {images.length < 15 && (
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
            {uploading ? "Uploading..." : "Upload Tour Images"}
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
              multiple
            />
          </label>
        </Button>
      )}
      
      <p className="text-sm text-muted-foreground">
        {images.length}/15 images uploaded
      </p>
    </div>
  );
};

export default VirtualTourUpload;
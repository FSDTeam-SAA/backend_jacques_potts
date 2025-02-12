import { useState, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadError extends Error {
  code?: string;
  details?: string;
}

export const useImageUpload = (form: UseFormReturn<any>) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toast.error("No files selected");
      return;
    }

    try {
      setUploading(true);
      const files = Array.from(e.target.files);
      
      // Get current images
      const currentImages = form.getValues('image_urls') || [];
      
      // Check total number of images
      if (currentImages.length + files.length > 15) {
        toast.error("Maximum 15 images allowed");
        return;
      }

      const uploadPromises = files.map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not an image file`);
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} exceeds 5MB limit`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('business_images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('business_images')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Update form with new array of image URLs
      form.setValue('image_urls', [...currentImages, ...uploadedUrls]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      const err = error as UploadError;
      console.error('Error uploading images:', err);
      toast.error(err.message || "Failed to upload images");
      
      if (err.code === "storage/quota-exceeded") {
        toast.error("Storage quota exceeded. Please contact support.");
      }
    } finally {
      setUploading(false);
    }
  }, [form]);

  return { uploading, handleImageUpload };
};
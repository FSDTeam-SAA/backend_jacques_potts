import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { BusinessListingFormProps } from "../types";
import ImagePreviewField from "./image-upload/ImagePreviewField";
import UploadButtonField from "./image-upload/UploadButtonField";
import { useImageUpload } from "./image-upload/useImageUpload";

const ImageUploadField = ({ form }: BusinessListingFormProps) => {
  const { uploading, handleImageUpload } = useImageUpload(form);
  const imageUrls = form.watch('image_urls') || [];

  return (
    <FormField
      control={form.control}
      name="image_urls"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property Images (Max 15)</FormLabel>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageUrls.map((url: string, index: number) => (
                <ImagePreviewField 
                  key={index} 
                  imageUrl={url} 
                  onRemove={() => {
                    const newUrls = imageUrls.filter((_, i) => i !== index);
                    form.setValue('image_urls', newUrls);
                  }}
                />
              ))}
            </div>
            {imageUrls.length < 15 && (
              <UploadButtonField 
                uploading={uploading} 
                onImageUpload={handleImageUpload}
                multiple={true}
              />
            )}
            <p className="text-sm text-muted-foreground">
              {imageUrls.length}/15 images uploaded
            </p>
          </div>
        </FormItem>
      )}
    />
  );
};

export default ImageUploadField;
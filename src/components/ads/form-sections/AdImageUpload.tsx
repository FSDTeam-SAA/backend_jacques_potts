import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import ImagePreview from "./image-upload/ImagePreview";
import UploadButton from "./image-upload/UploadButton";
import { useImageUpload } from "./image-upload/useImageUpload";

interface AdImageUploadProps {
  form: UseFormReturn<any>;
}

const AdImageUpload = ({ form }: AdImageUploadProps) => {
  const { uploading, handleImageUpload } = useImageUpload(form);

  return (
    <FormField
      control={form.control}
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Image</FormLabel>
          <div className="space-y-4">
            {field.value && <ImagePreview imageUrl={field.value} />}
            <div>
              <UploadButton 
                isUploading={uploading} 
                onFileChange={handleImageUpload} 
              />
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AdImageUpload;
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImagePreviewFieldProps {
  imageUrl: string;
  onRemove: () => void;
}

const ImagePreviewField = ({ imageUrl, onRemove }: ImagePreviewFieldProps) => {
  return (
    <div className="relative group">
      <img
        src={imageUrl}
        alt="Property preview"
        className="w-full h-40 object-cover rounded-lg"
      />
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImagePreviewField;
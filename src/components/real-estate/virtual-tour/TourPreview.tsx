import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface TourPreviewProps {
  url: string;
}

const TourPreview = ({ url }: TourPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!url) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] sm:h-[90vh]">
        <DialogHeader>
          <DialogTitle>Virtual Tour Preview</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full">
          <iframe
            src={url}
            className="w-full h-[calc(90vh-100px)]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourPreview;
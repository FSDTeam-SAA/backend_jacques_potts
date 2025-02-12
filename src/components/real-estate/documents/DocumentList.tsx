import { Button } from "@/components/ui/button";
import { File, X } from "lucide-react";

interface DocumentListProps {
  documents: any[];
  onRemove: (index: number) => void;
}

const DocumentList = ({ documents, onRemove }: DocumentListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {documents?.map((doc: any, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border rounded-lg"
        >
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span className="text-sm truncate">
              {doc.document_url.split('/').pop()}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
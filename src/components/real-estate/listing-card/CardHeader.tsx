import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CardHeaderProps {
  imageUrl?: string;
  location: string;
  isFeatured?: boolean;
}

const CardHeader = ({ imageUrl, location, isFeatured }: CardHeaderProps) => {
  return (
    <div className="relative h-48 w-full">
      <img
        src={imageUrl}
        alt={`Property in ${location}`}
        className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
      />
      {isFeatured && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-yellow-400 text-black">
            <Star className="w-4 h-4 mr-1" />
            Featured
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CardHeader;
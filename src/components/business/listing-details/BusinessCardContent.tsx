import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import type { BusinessListing } from "@/types/supabase";

interface BusinessCardContentProps {
  business: BusinessListing;
  showPropertyDetails?: boolean;
}

const BusinessCardContent = ({ business, showPropertyDetails }: BusinessCardContentProps) => {
  const navigate = useNavigate();

  return (
    <CardContent className="p-3 space-y-2">
      <div className="flex items-center gap-1 text-muted-foreground text-xs">
        <MapPin className="h-3 w-3" />
        <span className="truncate">{business.location}</span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-1">
        {business.description}
      </p>

      <Button 
        className="w-full h-8 text-xs"
        onClick={() => navigate(`/listings/${business.id}`)}
      >
        View Details
      </Button>
    </CardContent>
  );
};

export default BusinessCardContent;
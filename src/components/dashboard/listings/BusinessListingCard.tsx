import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { BusinessListing } from "@/types/business";

interface BusinessListingCardProps {
  listing: BusinessListing;
  onEdit: (type: string, id: string) => void;
}

const BusinessListingCard = ({ listing, onEdit }: BusinessListingCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <img
          src={listing.image_url || "/placeholder.svg"}
          alt={listing.business_name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h4 className="font-semibold">{listing.business_name}</h4>
        <p className="text-sm text-muted-foreground mt-1">{listing.location}</p>
        <div className="mt-2 flex justify-between items-center">
          <Badge variant={listing.status === "published" ? "default" : "secondary"}>
            {listing.status}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit('business', listing.id)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessListingCard;
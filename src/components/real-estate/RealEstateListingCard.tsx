import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import CardHeader from "./listing-card/CardHeader";
import PropertyDetails from "./listing-card/PropertyDetails";

interface RealEstateListingCardProps {
  listing: {
    id: string;
    property_type: string;
    square_footage: number;
    year_built: number;
    parking_spaces: number;
    asking_price: number;
    location: string;
    description: string;
    image_url?: string;
    is_featured?: boolean;
    user_id?: string;
  };
  showEditButton?: boolean;
}

const RealEstateListingCard = ({ listing, showEditButton = false }: RealEstateListingCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`hover:shadow-lg transition-shadow ${listing.is_featured ? 'border-2 border-yellow-400' : ''}`}>
      <CardHeader
        imageUrl={listing.image_url}
        location={listing.location}
        isFeatured={listing.is_featured}
      />

      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">
            ${listing.asking_price.toLocaleString()}
          </h3>
          <Badge variant="secondary">{listing.property_type}</Badge>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{listing.location}</span>
        </div>

        <PropertyDetails
          squareFootage={listing.square_footage}
          yearBuilt={listing.year_built}
          parkingSpaces={listing.parking_spaces}
        />

        <p className="text-sm text-muted-foreground line-clamp-2">
          {listing.description}
        </p>

        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={() => navigate(`/listings/${listing.id}`)}
          >
            View Details
          </Button>
          {showEditButton && (
            <Button 
              variant="outline"
              onClick={() => navigate(`/real-estate/edit/${listing.id}`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealEstateListingCard;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Eye, MessageSquare, Heart } from "lucide-react";

interface PropertySectionProps {
  listings: any[];
}

const PropertySection = ({ listings }: PropertySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Properties</CardTitle>
      </CardHeader>
      <CardContent>
        {listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Link key={listing.id} to={`/real-estate/${listing.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src={listing.image_url || "/placeholder.svg"}
                      alt={listing.business_name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-semibold">{listing.business_name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {listing.location}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Eye className="w-4 h-4" /> Views
                        </p>
                        <p className="font-medium">
                          {listing.property_analytics?.[0]?.views_count || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" /> Inquiries
                        </p>
                        <p className="font-medium">
                          {listing.property_analytics?.[0]?.inquiries_count || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Heart className="w-4 h-4" /> Favorites
                        </p>
                        <p className="font-medium">
                          {listing.property_analytics?.[0]?.favorite_count || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You haven't listed any properties yet.
            </p>
            <Link to="/real-estate">
              <Button>List Your First Property</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertySection;
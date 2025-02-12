import { Building2, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessListingCard from "./BusinessListingCard";
import AssetListingCard from "./AssetListingCard";
import { BusinessListing, Asset } from "@/types/business";

interface ListingsSectionProps {
  businessListings?: BusinessListing[];
  assetListings?: Asset[];
  onEdit: (type: string, id: string) => void;
}

const ListingsSection = ({ businessListings, assetListings, onEdit }: ListingsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Business Listings */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Building2 className="w-5 h-5 mr-2" />
              Business Listings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businessListings?.map((listing) => (
                <BusinessListingCard
                  key={listing.id}
                  listing={listing}
                  onEdit={onEdit}
                />
              ))}
            </div>
          </div>

          {/* Asset Listings */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Package className="w-5 h-5 mr-2" />
              Asset Listings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assetListings?.map((listing) => (
                <AssetListingCard
                  key={listing.id}
                  listing={listing}
                  onEdit={onEdit}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingsSection;
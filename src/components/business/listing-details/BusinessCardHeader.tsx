import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Video, File, Star } from "lucide-react";
import { BusinessListing } from "@/types/business";

interface BusinessCardHeaderProps {
  business: BusinessListing;
  documentCount: number;
}

const BusinessCardHeader = ({ business, documentCount }: BusinessCardHeaderProps) => {
  return (
    <>
      {business.image_url && (
        <div className="relative h-32 w-full">
          <img
            src={business.image_url}
            alt={business.business_name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute top-1 right-1 flex flex-col gap-1">
            {business.is_featured && (
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs py-0">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {business.has_virtual_tour && (
              <Badge variant="secondary" className="bg-blue-500 text-white text-xs py-0">
                <Video className="w-3 h-3 mr-1" />
                Tour
              </Badge>
            )}
            {documentCount > 0 && (
              <Badge variant="secondary" className="bg-green-500 text-white text-xs py-0">
                <File className="w-3 h-3 mr-1" />
                {documentCount}
              </Badge>
            )}
          </div>
        </div>
      )}
      <CardHeader className="p-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-sm font-semibold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(business.asking_price)}
          </CardTitle>
          {business.property_type && (
            <Badge variant="secondary" className="text-xs">{business.property_type}</Badge>
          )}
        </div>
      </CardHeader>
    </>
  );
};

export default BusinessCardHeader;
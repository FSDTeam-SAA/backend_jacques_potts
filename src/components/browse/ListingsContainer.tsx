import BusinessCard from "../business/BusinessCard";
import type { BusinessListing } from "@/types/supabase";

interface ListingsContainerProps {
  listings: BusinessListing[];
}

const ListingsContainer = ({ listings }: ListingsContainerProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      {listings.map((listing) => (
        <BusinessCard 
          key={listing.id} 
          business={listing}
          showPropertyDetails={listing.property_type !== undefined}
        />
      ))}
    </div>
  );
};

export default ListingsContainer;
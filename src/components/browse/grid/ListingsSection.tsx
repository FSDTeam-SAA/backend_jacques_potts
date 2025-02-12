import ListingsStats from "../ListingsStats";
import ListingsContainer from "../ListingsContainer";
import type { BusinessListing } from "@/types/supabase";

interface ListingsSectionProps {
  listings: BusinessListing[];
}

const ListingsSection = ({ listings }: ListingsSectionProps) => {
  return (
    <>
      <ListingsStats count={listings.length} />
      <ListingsContainer listings={listings} />
    </>
  );
};

export default ListingsSection;
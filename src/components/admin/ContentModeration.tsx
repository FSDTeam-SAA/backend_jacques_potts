import { useListingsManagement } from "./content-moderation/useListingsManagement";
import ListingModeration from "./content-moderation/ListingModeration";

const ContentModeration = () => {
  const {
    listings,
    isLoading,
    generateListingsMutation,
    removeListingsMutation,
    handleApprove,
    handleReject,
  } = useListingsManagement();

  return (
    <ListingModeration
      listings={listings || []}
      isLoading={isLoading}
      onGenerate={() => generateListingsMutation.mutate()}
      onRemove={() => removeListingsMutation.mutate()}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
};

export default ContentModeration;
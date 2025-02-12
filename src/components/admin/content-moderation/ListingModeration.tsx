import { BusinessListing } from "@/types/business";
import ListingsTable from "./ListingsTable";
import ListingsStats from "./ListingsStats";
import ListingsActions from "./ListingsActions";

interface ListingModerationProps {
  listings: BusinessListing[];
  isLoading: boolean;
  onGenerate: () => void;
  onRemove: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ListingModeration = ({
  listings,
  isLoading,
  onGenerate,
  onRemove,
  onApprove,
  onReject,
}: ListingModerationProps) => {
  if (isLoading) {
    return <div>Loading content...</div>;
  }

  const temporaryCount = listings?.filter(l => l.is_temporary).length || 0;
  const realCount = listings?.filter(l => !l.is_temporary).length || 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Content Moderation</h2>
        <ListingsActions
          onGenerate={onGenerate}
          onRemove={onRemove}
          temporaryCount={temporaryCount}
        />
      </div>

      <ListingsStats
        temporaryCount={temporaryCount}
        realCount={realCount}
      />

      <ListingsTable
        listings={listings}
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
};

export default ListingModeration;
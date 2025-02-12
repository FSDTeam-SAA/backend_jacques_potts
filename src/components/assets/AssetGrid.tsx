import { Loader2 } from "lucide-react";
import type { Asset } from "@/types/business";
import AssetCard from "./AssetCard";

interface AssetGridProps {
  assets: Asset[] | null;
  isLoading: boolean;
}

const AssetGrid = ({ assets, isLoading }: AssetGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!assets?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No Assets Found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or check back later for new listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
};

export default AssetGrid;
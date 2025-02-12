import React from "react";
import { BusinessListing } from "@/types/business";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import FilterSection from "./grid/FilterSection";
import ListingsSection from "./grid/ListingsSection";
import { usePremiumFeatures } from "@/contexts/PremiumFeaturesContext";
import { useListings } from "@/hooks/useListings";
import LoadingState from "./LoadingState";

interface ListingsGridProps {
  filters?: {
    revenueRange: [number, number];
    profitMargin: [number, number];
    employeeCount: string;
    yearsInOperation: string;
    businessType: string;
    locationType: string;
    hasWebsite: boolean;
    hasSocialMedia: boolean;
    scalabilityRating: number;
    isFranchiseAvailable: boolean;
    verificationType: string;
  };
  onFilterChange?: (filters: any) => void;
  onFilterReset?: () => void;
}

const ListingsGrid: React.FC<ListingsGridProps> = ({
  filters,
  onFilterChange,
  onFilterReset,
}) => {
  const { features } = usePremiumFeatures();
  const isDynamicActive = features.find(f => f.type === "dynamic_filters")?.isActive;
  
  const { data: listings, isLoading, error } = useListings(filters);

  console.log("Listings data:", listings);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  if (error) {
    return <ErrorState error={error} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!listings || listings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterSection 
            onFilterChange={onFilterChange || ((newFilters) => console.log("Filters changed:", newFilters))}
            onFilterReset={onFilterReset || (() => console.log("Filters reset"))}
          />
        </div>
        <div className="lg:col-span-3">
          <ListingsSection listings={listings} />
        </div>
      </div>
    </div>
  );
};

export default ListingsGrid;
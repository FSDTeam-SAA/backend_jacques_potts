import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ListingsContainer from "./ListingsContainer";
import { useListings } from "@/hooks/useListings";
import FiltersSheet from "./FiltersSheet";

interface BrowseTabsProps {
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
  isDynamicActive?: boolean;
  onFilterChange?: (filters: any) => void;
  onFilterReset?: () => void;
  setShowPaymentDialog?: (show: boolean) => void;
}

const BrowseTabs = ({ 
  filters,
  isDynamicActive,
  onFilterChange,
  onFilterReset,
  setShowPaymentDialog 
}: BrowseTabsProps) => {
  // Fetch listings data using the hook
  const { data: listings } = useListings(filters);

  return (
    <Tabs defaultValue="listings" className="w-full space-y-4">
      <div className="flex justify-between items-center mb-4">
        {/* Add FiltersSheet here */}
        {onFilterChange && onFilterReset && setShowPaymentDialog && (
          <FiltersSheet
            filters={filters}
            onFilterChange={onFilterChange}
            onFilterReset={onFilterReset}
            setShowPaymentDialog={setShowPaymentDialog}
          />
        )}
      </div>
      
      <div className="mt-6">
        <TabsContent value="listings" className="mt-0">
          <ListingsContainer listings={listings || []} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default BrowseTabs;
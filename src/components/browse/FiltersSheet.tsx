import BasicFilters from "@/components/business/BasicFilters";
import DynamicFilters from "@/components/business/DynamicFilters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePremiumFeatures } from "@/contexts/PremiumFeaturesContext";
import { useFeaturePayment } from "@/hooks/useFeaturePayment";
import { Filter, Lock } from "lucide-react";

interface FiltersSheetProps {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  onFilterReset: () => void;
  setShowPaymentDialog: (show: boolean) => void;
}

const FiltersSheet = ({
  filters,
  onFilterChange,
  onFilterReset,
  setShowPaymentDialog,
}: FiltersSheetProps) => {
  const { features } = usePremiumFeatures();


  // console.log("features", features);

  const { isProcessing } = useFeaturePayment();
  const isDynamicActive = features.find(
    (f) => f.type === "dynamic_filters"
  )?.isActive;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="hover:bg-[#1a365d]/10">
          <Filter className="w-4 h-4 mr-2" />
          Filter Results
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Businesses</SheetTitle>
          <SheetDescription>
            <div className="space-y-6">
              <BasicFilters
                onFilterChange={onFilterChange}
                onReset={onFilterReset}
              />  

              {!isDynamicActive && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock size={16} className="text-muted-foreground" />
                    <h3 className="font-semibold">Dynamic Filters</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Purchase dynamic filters to access advanced search options.
                  </p>
                  <Button
                    onClick={() => setShowPaymentDialog(true)}
                    className="w-full bg-[#1a365d] hover:bg-[#2a4a7d]"
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : "Unlock Dynamic Filters ($1 for 1 hour)"}
                  </Button>
                </div>
              )}

              {isDynamicActive && (
                <DynamicFilters
                  onFilterChange={onFilterChange}
                  onReset={onFilterReset}
                />
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersSheet;

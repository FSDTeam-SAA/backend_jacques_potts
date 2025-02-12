import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePremiumFeatures } from "@/contexts/PremiumFeaturesContext";
import { usePayment } from "@/contexts/PaymentContext";
import DynamicFilters from "../../business/DynamicFilters";

interface FilterSectionProps {
  onFilterChange: (filters: any) => void;
  onFilterReset: () => void;
}

const FilterSection = ({ onFilterChange, onFilterReset }: FilterSectionProps) => {
  const { checkFeatureStatus, activateFeature } = usePremiumFeatures();
  const { processPayment } = usePayment();

  const handleFilterChange = async (newFilters: any) => {
    const hasAccess = await checkFeatureStatus("dynamic_filters");
    if (!hasAccess) {
      const confirmed = window.confirm(
        "Dynamic filters is a premium feature. Would you like to activate it for $1?"
      );
      if (confirmed) {
        const success = await processPayment(1, "Dynamic Filters (1 hour)");
        if (success) {
          await activateFeature("dynamic_filters", 1);
          toast.success("Dynamic filters activated!");
        }
      }
      return;
    }
    onFilterChange(newFilters);
  };

  return (
    <DynamicFilters 
      onFilterChange={handleFilterChange}
      onReset={onFilterReset}
    />
  );
};

export default FilterSection;
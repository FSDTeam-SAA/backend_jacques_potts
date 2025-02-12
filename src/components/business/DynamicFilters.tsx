import React from "react";
import { Button } from "@/components/ui/button";
import { FilterState } from "./filters/types";
import FilterAccordion from "./filters/FilterAccordion";

interface DynamicFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const DynamicFilters = ({ onFilterChange, onReset }: DynamicFiltersProps) => {
  const [filters, setFilters] = React.useState<FilterState>({
    revenueRange: [0, 10000000],
    profitMargin: [0, 100],
    employeeCount: "",
    yearsInOperation: "",
    businessType: "",
    locationType: "",
    hasWebsite: false,
    hasSocialMedia: false,
    scalabilityRating: 0,
    isFranchiseAvailable: false,
    verificationType: "",
    subIndustry: "",
    city: "",
    establishedAfterYear: "",
    cashFlowRange: [0, 1000000],
    profitMargins: [0, 100],
    maxDebt: "",
    hasRecurringRevenue: false,
    sellerFinancing: false,
    realEstateIncluded: false,
    isFranchise: false,
    absenteeOwner: false,
    locationCount: "",
    hasLiens: false,
    includesIP: false,
    includesEquipment: false,
    minSocialFollowers: 0,
    financialSoftware: "",
    managementSoftware: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <FilterAccordion 
        onFilterChange={handleFilterChange}
        formatCurrency={formatCurrency}
      />

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
        <Button onClick={() => onFilterChange(filters)}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default DynamicFilters;
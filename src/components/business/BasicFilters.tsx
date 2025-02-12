import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { industries, states, priceRanges } from "@/components/business-listing/constants";

interface FilterState {
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
  industry: string;
  state: string;
  priceRange: [number, number];
  grossRevenue: [number, number];
}

interface BasicFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const BasicFilters = ({ onFilterChange, onReset }: BasicFiltersProps) => {
  const [filters, setFilters] = React.useState<FilterState>({
    revenueRange: [0, 100000000],
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
    industry: "",
    state: "",
    priceRange: [0, 100000000],
    grossRevenue: [0, 100000000],
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Industry</Label>
          <Select
            onValueChange={(value) => handleFilterChange("industry", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry.toLowerCase()}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>State</Label>
          <Select
            onValueChange={(value) => handleFilterChange("state", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state.toLowerCase()}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Price Range ({formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])})</Label>
          <Slider
            defaultValue={[0, 100000000]}
            max={100000000}
            step={100000}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Gross Revenue ({formatCurrency(filters.grossRevenue[0])} - {formatCurrency(filters.grossRevenue[1])})</Label>
          <Slider
            defaultValue={[0, 100000000]}
            max={100000000}
            step={100000}
            onValueChange={(value) => handleFilterChange("grossRevenue", value)}
            className="mt-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
        <Button onClick={() => onFilterChange(filters)}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default BasicFilters;
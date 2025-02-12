import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { subIndustries } from "@/components/business-listing/constants";

interface BusinessInfoFiltersProps {
  onFilterChange: (key: string, value: any) => void;
  selectedIndustry?: string;
}

const BusinessInfoFilters = ({ onFilterChange, selectedIndustry }: BusinessInfoFiltersProps) => {
  const availableSubIndustries = selectedIndustry ? 
    subIndustries[selectedIndustry.toLowerCase()] || [] : [];

  return (
    <div className="space-y-4">
      <div>
        <Label>Sub-Industry</Label>
        <Select
          onValueChange={(value) => onFilterChange("subIndustry", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sub-industry" />
          </SelectTrigger>
          <SelectContent>
            {availableSubIndustries.map((subIndustry) => (
              <SelectItem key={subIndustry} value={subIndustry.toLowerCase()}>
                {subIndustry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>City</Label>
        <Input 
          type="text" 
          placeholder="Enter city name"
          onChange={(e) => onFilterChange("city", e.target.value)}
        />
      </div>
      <div>
        <Label>Established After Year</Label>
        <Input 
          type="number" 
          placeholder="YYYY"
          min="1900"
          max={new Date().getFullYear()}
          onChange={(e) => onFilterChange("establishedAfterYear", e.target.value)}
        />
      </div>
    </div>
  );
};

export default BusinessInfoFilters;
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OperationalFiltersProps {
  onFilterChange: (key: string, value: any) => void;
}

const OperationalFilters = ({ onFilterChange }: OperationalFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("sellerFinancing", checked)}
        />
        <Label>Seller Financing Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("realEstateIncluded", checked)}
        />
        <Label>Real Estate Included</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("isFranchise", checked)}
        />
        <Label>Is Franchise</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("absenteeOwner", checked)}
        />
        <Label>Absentee Owner</Label>
      </div>
      <div>
        <Label>Number of Employees</Label>
        <Select onValueChange={(value) => onFilterChange("employeeCount", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select employee range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-5">1-5</SelectItem>
            <SelectItem value="6-10">6-10</SelectItem>
            <SelectItem value="11-25">11-25</SelectItem>
            <SelectItem value="26-50">26-50</SelectItem>
            <SelectItem value="51+">51+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Number of Locations</Label>
        <Input
          type="number"
          min="1"
          placeholder="Enter number of locations"
          onChange={(e) => onFilterChange("locationCount", e.target.value)}
        />
      </div>
    </div>
  );
};

export default OperationalFilters;
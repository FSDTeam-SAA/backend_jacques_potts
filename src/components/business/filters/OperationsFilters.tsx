import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface OperationsFiltersProps {
  onFilterChange: (key: string, value: string) => void;
}

const OperationsFilters = ({ onFilterChange }: OperationsFiltersProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Business Type</Label>
        <Select onValueChange={(value) => onFilterChange("businessType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="B2B">B2B</SelectItem>
            <SelectItem value="B2C">B2C</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Years in Operation</Label>
        <Select onValueChange={(value) => onFilterChange("yearsInOperation", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="10+">10+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Location Type</Label>
        <Select onValueChange={(value) => onFilterChange("locationType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select location type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owned">Owned Property</SelectItem>
            <SelectItem value="leased">Leased Space</SelectItem>
            <SelectItem value="home-based">Home-based</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OperationsFilters;
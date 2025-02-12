import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SoftwareFiltersProps {
  onFilterChange: (key: string, value: any) => void;
}

const SoftwareFilters = ({ onFilterChange }: SoftwareFiltersProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Financial Software</Label>
        <Select onValueChange={(value) => onFilterChange("financialSoftware", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select financial software" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quickbooks">QuickBooks</SelectItem>
            <SelectItem value="xero">Xero</SelectItem>
            <SelectItem value="freshbooks">FreshBooks</SelectItem>
            <SelectItem value="sage">Sage</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Business Management Software</Label>
        <Select onValueChange={(value) => onFilterChange("managementSoftware", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select management software" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="salesforce">Salesforce</SelectItem>
            {/* <SelectItem value="thryv">Thryv</SelectItem> */}
            <SelectItem value="zoho">Zoho</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SoftwareFilters;
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { states } from "@/components/business-listing/constants";

const LocationFilters = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>State</Label>
        <Select>
          <SelectTrigger>
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

      <div className="space-y-2">
        <Label>Business District Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select district type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urban">Urban Center</SelectItem>
            <SelectItem value="suburban">Suburban</SelectItem>
            <SelectItem value="industrial">Industrial Park</SelectItem>
            <SelectItem value="retail">Retail District</SelectItem>
            <SelectItem value="business">Business District</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationFilters;
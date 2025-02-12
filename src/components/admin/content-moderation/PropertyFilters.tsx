import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PropertyFiltersProps {
  onFilterChange: (filters: any) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState({
    propertyStyle: "",
    constructionStatus: "",
    buildingClass: "",
    energyRating: "",
    propertyType: "",
    propertyCategory: "",
    location: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      propertyStyle: "",
      constructionStatus: "",
      buildingClass: "",
      energyRating: "",
      propertyType: "",
      propertyCategory: "",
      location: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Property Style</Label>
          <Select
            onValueChange={(value) => handleFilterChange("propertyStyle", value)}
            value={filters.propertyStyle}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="traditional">Traditional</SelectItem>
              <SelectItem value="contemporary">Contemporary</SelectItem>
              <SelectItem value="colonial">Colonial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Construction Status</Label>
          <Select
            onValueChange={(value) => handleFilterChange("constructionStatus", value)}
            value={filters.constructionStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="under_construction">Under Construction</SelectItem>
              <SelectItem value="pre_construction">Pre-Construction</SelectItem>
              <SelectItem value="renovating">Renovating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Building Class</Label>
          <Select
            onValueChange={(value) => handleFilterChange("buildingClass", value)}
            value={filters.buildingClass}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class_a">Class A</SelectItem>
              <SelectItem value="class_b">Class B</SelectItem>
              <SelectItem value="class_c">Class C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Energy Rating</Label>
          <Select
            onValueChange={(value) => handleFilterChange("energyRating", value)}
            value={filters.energyRating}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">A</SelectItem>
              <SelectItem value="b">B</SelectItem>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="d">D</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Location</Label>
          <Input
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
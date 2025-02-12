import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertyTypes, propertyFeatures } from "./searchConstants";
import { SearchFilters } from "./types";

interface PropertySearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

const PropertySearchForm = ({ onSearch }: PropertySearchFormProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 1000000],
    propertyType: "",
    minBedrooms: "",
    minBathrooms: "",
    minSquareFeet: "",
    features: [],
    location: "",
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label>Price Range</Label>
        <Slider
          defaultValue={[0, 1000000]}
          max={10000000}
          step={50000}
          onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0].toLocaleString()}</span>
          <span>${filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select
            onValueChange={(value) =>
              setFilters({ ...filters, propertyType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="Enter city, state"
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Min Bedrooms</Label>
          <Input
            type="number"
            min="0"
            placeholder="Minimum bedrooms"
            onChange={(e) =>
              setFilters({ ...filters, minBedrooms: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Min Bathrooms</Label>
          <Input
            type="number"
            min="0"
            placeholder="Minimum bathrooms"
            onChange={(e) =>
              setFilters({ ...filters, minBathrooms: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Min Square Feet</Label>
          <Input
            type="number"
            min="0"
            placeholder="Minimum square feet"
            onChange={(e) =>
              setFilters({ ...filters, minSquareFeet: e.target.value })
            }
          />
        </div>
      </div>

      <Button className="w-full" onClick={handleSearch}>
        Search Properties
      </Button>
    </div>
  );
};

export default PropertySearchForm;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AssetCategory, AssetCondition } from "./types";

interface AssetFiltersProps {
  filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    condition: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      minPrice: string;
      maxPrice: string;
      condition: string;
    }>
  >;
}

const categories: AssetCategory[] = [
  "Equipment",
  "Inventory",
  "Vehicles",
  "Furniture",
  "Technology",
  "Real Estate",
  "Intellectual Property",
  "Licenses",
  "Other",
];

const conditions: AssetCondition[] = [
  "New",
  "Like New",
  "Excellent",
  "Good",
  "Fair",
  "Poor",
];

const AssetFilters = ({ filters, setFilters }: AssetFiltersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Condition</Label>
          <Select
            value={filters.condition}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, condition: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Condition</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition.toLowerCase()}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetFilters;
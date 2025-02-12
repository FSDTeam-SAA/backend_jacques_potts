import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface MarketPresenceFiltersProps {
  onFilterChange: (key: string, value: any) => void;
}

const MarketPresenceFilters = ({ onFilterChange }: MarketPresenceFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("hasWebsite", checked)}
        />
        <Label>Has Website</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("hasSocialMedia", checked)}
        />
        <Label>Has Social Media</Label>
      </div>
      <div>
        <Label>Minimum Social Media Followers</Label>
        <Slider
          defaultValue={[0]}
          max={100000}
          step={1000}
          onValueChange={([value]) => onFilterChange("minSocialFollowers", value)}
        />
        <div className="text-sm text-muted-foreground mt-1">
          {`${new Intl.NumberFormat().format(0)} - ${new Intl.NumberFormat().format(100000)}`}
        </div>
      </div>
    </div>
  );
};

export default MarketPresenceFilters;
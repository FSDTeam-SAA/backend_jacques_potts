import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AssetsFiltersProps {
  onFilterChange: (key: string, value: any) => void;
}

const AssetsFilters = ({ onFilterChange }: AssetsFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("hasLiens", checked)}
        />
        <Label>Has Liens or Judgements</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("includesIP", checked)}
        />
        <Label>Includes IP/Trademarks</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("includesEquipment", checked)}
        />
        <Label>Includes Equipment/Inventory</Label>
      </div>
    </div>
  );
};

export default AssetsFilters;
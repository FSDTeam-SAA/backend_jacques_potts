import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface FinancialFiltersProps {
  onFilterChange: (key: string, value: any) => void;
  formatCurrency: (value: number) => string;
}

const FinancialFilters = ({ onFilterChange, formatCurrency }: FinancialFiltersProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Cash Flow Range</Label>
        <Slider
          defaultValue={[0, 1000000]}
          max={1000000}
          step={10000}
          onValueChange={(value) => onFilterChange("cashFlowRange", value)}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>{formatCurrency(0)}</span>
          <span>{formatCurrency(1000000)}</span>
        </div>
      </div>
      <div>
        <Label>Profit Margins (%)</Label>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          onValueChange={(value) => onFilterChange("profitMargins", value)}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
      <div>
        <Label>Total Business Debt</Label>
        <Input
          type="number"
          placeholder="Maximum acceptable debt"
          onChange={(e) => onFilterChange("maxDebt", e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange("hasRecurringRevenue", checked)}
        />
        <Label>Has Recurring Revenue</Label>
      </div>
    </div>
  );
};

export default FinancialFilters;
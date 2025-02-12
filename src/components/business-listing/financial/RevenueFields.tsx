import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { businessListingSchema } from "../schema";

type BusinessListingFormData = z.infer<typeof businessListingSchema>;

interface RevenueFieldsProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const RevenueFields = ({ form }: RevenueFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="annualRevenue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Annual Revenue</FormLabel>
            <FormControl>
              <Input placeholder="$" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="profitMargin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profit Margin (%)</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 25" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RevenueFields;
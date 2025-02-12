import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { businessListingSchema } from "../schema";

type BusinessListingFormData = z.infer<typeof businessListingSchema>;

interface DebtFieldsProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const DebtFields = ({ form }: DebtFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="monthlyCashFlow"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Cash Flow</FormLabel>
            <FormControl>
              <Input placeholder="$" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="totalDebt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Business Debt</FormLabel>
            <FormControl>
              <Input placeholder="$" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DebtFields;
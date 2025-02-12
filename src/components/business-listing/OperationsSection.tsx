import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BusinessListingFormProps } from "./types";
import RadioField from "./form-fields/RadioField";

const OperationsSection = ({ form }: BusinessListingFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Customer and Operations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="employeeCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Employees</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <RadioField
        form={form}
        name="hasRecurringRevenue"
        label="Does the business have recurring revenue?"
      />
    </div>
  );
};

export default OperationsSection;
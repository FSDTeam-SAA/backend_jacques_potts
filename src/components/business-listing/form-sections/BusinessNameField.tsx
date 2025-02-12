import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { businessListingSchema } from "../schema";

interface BusinessNameFieldProps {
  form: UseFormReturn<z.infer<typeof businessListingSchema>>;
}

const BusinessNameField = ({ form }: BusinessNameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="businessName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter business name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BusinessNameField;
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { businessListingSchema } from "../schema";

type BusinessListingFormData = z.infer<typeof businessListingSchema>;

interface LiensFieldProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const LiensField = ({ form }: LiensFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="hasLiens"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Are there any liens or judgments?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row space-x-4"
            >
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-normal">Yes</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-normal">No</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LiensField;
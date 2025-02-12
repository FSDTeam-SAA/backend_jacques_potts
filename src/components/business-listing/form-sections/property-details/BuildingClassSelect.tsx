import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";

interface BuildingClassSelectProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const BuildingClassSelect = ({ form }: BuildingClassSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="buildingClass"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Building Class</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select building class" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="class_a">Class A (Premium)</SelectItem>
              <SelectItem value="class_b">Class B (Good)</SelectItem>
              <SelectItem value="class_c">Class C (Fair)</SelectItem>
              <SelectItem value="class_d">Class D (Functional)</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BuildingClassSelect;
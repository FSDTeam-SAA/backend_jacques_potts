import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";

interface ConstructionStatusSelectProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const ConstructionStatusSelect = ({ form }: ConstructionStatusSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="constructionStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Construction Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select construction status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="new">New Construction</SelectItem>
              <SelectItem value="under_construction">Under Construction</SelectItem>
              <SelectItem value="recently_renovated">Recently Renovated</SelectItem>
              <SelectItem value="needs_renovation">Needs Renovation</SelectItem>
              <SelectItem value="historic">Historic</SelectItem>
              <SelectItem value="well_maintained">Well Maintained</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ConstructionStatusSelect;
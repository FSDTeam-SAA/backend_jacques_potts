import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";

interface PropertyStyleSelectProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const PropertyStyleSelect = ({ form }: PropertyStyleSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="propertyStyle"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property Style</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select property style" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="traditional">Traditional</SelectItem>
              <SelectItem value="contemporary">Contemporary</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="colonial">Colonial</SelectItem>
              <SelectItem value="victorian">Victorian</SelectItem>
              <SelectItem value="craftsman">Craftsman</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PropertyStyleSelect;
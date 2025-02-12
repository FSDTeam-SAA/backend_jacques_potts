import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";

interface EnergyRatingSelectProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const EnergyRatingSelect = ({ form }: EnergyRatingSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="energyRating"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Energy Rating</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select energy rating" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="a">A (Excellent)</SelectItem>
              <SelectItem value="b">B (Very Good)</SelectItem>
              <SelectItem value="c">C (Good)</SelectItem>
              <SelectItem value="d">D (Fair)</SelectItem>
              <SelectItem value="e">E (Poor)</SelectItem>
              <SelectItem value="f">F (Very Poor)</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EnergyRatingSelect;
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PropertyDetailsProps {
  form: UseFormReturn<any>;
}

const PropertyDetails = ({ form }: PropertyDetailsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="year_built"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year Built</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lot_size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lot Size</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., 0.25 acres" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="parking_spaces"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Parking Spaces</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="asking_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asking Price</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyDetails;
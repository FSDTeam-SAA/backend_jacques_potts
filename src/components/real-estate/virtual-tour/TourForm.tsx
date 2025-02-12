import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface TourFormProps {
  form: UseFormReturn<any>;
}

const TourForm = ({ form }: TourFormProps) => {
  const hasVirtualTour = form.watch("has_virtual_tour");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="has_virtual_tour"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Virtual Tour</FormLabel>
              <FormDescription>
                Enable virtual tour for this property
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {hasVirtualTour && (
        <FormField
          control={form.control}
          name="virtual_tour_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Virtual Tour URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://" />
              </FormControl>
              <FormDescription>
                Enter the URL for your virtual tour (e.g., Matterport, YouTube, or other virtual tour platforms)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default TourForm;
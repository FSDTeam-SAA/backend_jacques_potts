import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";

interface FeatureToggleSectionProps {
  form: UseFormReturn<z.infer<typeof settingsSchema>>;
}

const settingsSchema = z.object({
  requireVerification: z.boolean(),
  autoApproveListings: z.boolean(),
});

const FeatureToggleSection = ({ form }: FeatureToggleSectionProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="requireVerification"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Require Seller Verification
              </FormLabel>
              <FormDescription>
                Require sellers to be verified before listing businesses
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

      <FormField
        control={form.control}
        name="autoApproveListings"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Auto-approve Listings
              </FormLabel>
              <FormDescription>
                Automatically approve new business listings
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
    </div>
  );
};

export default FeatureToggleSection;
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";

interface FeePricingSectionProps {
  form: UseFormReturn<z.infer<typeof settingsSchema>>;
}

const settingsSchema = z.object({
  verificationFee: z.string(),
  loiFee: z.string(),
  adListingFee: z.string(),
  templateAccessFee: z.string(),
  realEstateListingFee: z.string(),
});

const FeePricingSection = ({ form }: FeePricingSectionProps) => {
  return (
    <div className="grid gap-6">
      <FormField
        control={form.control}
        name="realEstateListingFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Real Estate Listing Fee ($)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormDescription>
              Fee charged for posting a real estate listing
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="adListingFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Ad Listing Fee ($)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormDescription>
              Fee charged for posting a business listing
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="verificationFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Verification Fee ($)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormDescription>
              Fee charged for seller verification
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="loiFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LOI Submission Fee ($)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormDescription>
              Fee charged for submitting a Letter of Intent
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="templateAccessFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Legal Template Access Fee ($)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormDescription>
              Fee charged for accessing legal document templates
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FeePricingSection;
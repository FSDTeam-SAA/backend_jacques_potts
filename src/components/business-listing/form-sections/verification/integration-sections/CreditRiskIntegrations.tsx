import { IntegrationButton } from "../IntegrationButton";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../../schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CreditRiskIntegrationsProps {
  handleIntegrationClick: (key: string) => void;
  form: UseFormReturn<BusinessListingFormData>;
}

export const CreditRiskIntegrations = ({
  handleIntegrationClick,
  form,
}: CreditRiskIntegrationsProps) => {
  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-muted-foreground">Credit & Risk Verification</h5>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Tax ID (EIN)</FormLabel>
              <FormControl>
                <Input placeholder="XX-XXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Business St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <IntegrationButton
          label="Verify with Creditsafe"
          integrationKey="creditsafe"
          onClick={handleIntegrationClick}
        />
        
        <div className="text-sm text-muted-foreground mt-2">
          <p>Verify your business through Creditsafe's global business intelligence network:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Business credit reports</li>
            <li>Risk assessment</li>
            <li>Company verification</li>
            <li>Financial health check</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
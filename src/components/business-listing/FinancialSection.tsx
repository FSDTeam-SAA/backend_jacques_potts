import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { businessListingSchema } from "./schema";
import RevenueFields from "./financial/RevenueFields";
import DebtFields from "./financial/DebtFields";
import LiensField from "./financial/LiensField";
import { PlaidLink } from "@/components/plaid/PlaidLink";

type BusinessListingFormData = z.infer<typeof businessListingSchema>;

interface FinancialSectionProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const FinancialSection = ({ form }: FinancialSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Financial Information</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Connect Bank Account</h4>
        <PlaidLink onSuccess={() => console.log('Plaid connection successful')} />
      </div>

      <RevenueFields form={form} />
      <DebtFields form={form} />
      <LiensField form={form} />
    </div>
  );
};

export default FinancialSection;
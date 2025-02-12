import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";
import BasicInfoSection from "../../BasicInfoSection";
import FinancialSection from "../../FinancialSection";
import OperationsSection from "../../OperationsSection";
import AssetsSection from "../../AssetsSection";
import VerificationSection from "../VerificationSection";

interface FormSectionsProps {
  form: UseFormReturn<BusinessListingFormData>;
  isVerified: boolean;
  onVerificationComplete: () => void;
}

const FormSections = ({ form, isVerified, onVerificationComplete }: FormSectionsProps) => {
  return (
    <>
      <BasicInfoSection form={form} />
      <VerificationSection 
        form={form}
        onVerificationComplete={onVerificationComplete}
        isVerified={isVerified}
      />
      <FinancialSection form={form} />
      <OperationsSection form={form} />
      <AssetsSection form={form} />
    </>
  );
};

export default FormSections;
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../schema";
import BasicInfoSection from "../BasicInfoSection";
import FinancialSection from "../FinancialSection";
import OperationsSection from "../OperationsSection";
import AssetsSection from "../AssetsSection";
import ValidationErrors from "./ValidationErrors";
import FormSubmitButton from "./FormSubmitButton";
import VerificationSection from "./verification/VerificationSection";
import LicenseVerificationSection from "./verification/LicenseVerificationSection";

interface BusinessListingFormContainerProps {
  form: UseFormReturn<BusinessListingFormData>;
  onSubmit: (data: BusinessListingFormData) => Promise<void>;
  isSubmitting: boolean;
  formErrors?: string[];
  businessId?: string;
}

const BusinessListingFormContainer = ({
  form,
  onSubmit,
  isSubmitting,
  formErrors,
  businessId,
}: BusinessListingFormContainerProps) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <BasicInfoSection form={form} />
      <LicenseVerificationSection form={form} />
      <FinancialSection form={form} />
      <OperationsSection form={form} />
      <AssetsSection form={form} />
      <VerificationSection form={form} />
      {formErrors && <ValidationErrors errors={formErrors} />}
      <FormSubmitButton isSubmitting={isSubmitting} businessId={businessId} />
    </form>
  );
};

export default BusinessListingFormContainer;
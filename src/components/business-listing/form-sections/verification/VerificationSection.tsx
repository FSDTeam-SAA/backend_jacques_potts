import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ApiVerificationSection } from "./ApiVerificationSection";
import { ManualVerificationSection } from "./ManualVerificationSection";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";

interface VerificationSectionProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const VerificationSection = ({ form }: VerificationSectionProps) => {
  const [isVerified, setIsVerified] = useState(false);
  const [connectedApis, setConnectedApis] = useState<string[]>([]);

  const handleVerificationComplete = () => {
    setIsVerified(true);
  };

  if (isVerified) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <AlertDescription className="text-green-800">
          Your business has been verified! You can now publish your listing.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Business Verification</h3>
      
      <Alert>
        <AlertDescription>
          To ensure trust and transparency, all businesses must be verified before listing.
          Connect 2 verification services or opt for manual verification.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        <ApiVerificationSection
          connectedApis={connectedApis}
          setConnectedApis={setConnectedApis}
          onVerificationComplete={handleVerificationComplete}
          form={form}
        />
        <ManualVerificationSection onVerificationComplete={handleVerificationComplete} />
      </div>
    </div>
  );
};

export default VerificationSection;
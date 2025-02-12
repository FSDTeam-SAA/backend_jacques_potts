import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ApiVerificationSection } from "./verification/ApiVerificationSection";
import { ManualVerificationSection } from "./verification/ManualVerificationSection";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../schema";

interface VerificationSectionProps {
  onVerificationComplete: () => void;
  isVerified: boolean;
  form: UseFormReturn<BusinessListingFormData>;
}

const VerificationSection = ({ 
  onVerificationComplete, 
  isVerified,
  form 
}: VerificationSectionProps) => {
  const [connectedApis, setConnectedApis] = useState<string[]>([]);

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
          onVerificationComplete={onVerificationComplete}
          form={form}
        />
        <ManualVerificationSection onVerificationComplete={onVerificationComplete} />
      </div>
    </div>
  );
};

export default VerificationSection;
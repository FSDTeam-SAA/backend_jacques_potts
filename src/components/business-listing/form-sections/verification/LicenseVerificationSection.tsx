import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BusinessListingFormData } from "../../schema";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface LicenseVerificationSectionProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const LicenseVerificationSection = ({ form }: LicenseVerificationSectionProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');

  const handleVerification = async () => {
    const licenseNumber = form.getValues("taxId");
    const businessName = form.getValues("businessName");
    const state = form.getValues("state");

    if (!licenseNumber || !businessName || !state) {
      toast.error("Please fill in all required fields (License Number, Business Name, and State)");
      return;
    }

    setIsVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-business-license', {
        body: {
          licenseNumber,
          businessName,
          state,
        },
      });

      if (error) throw error;

      if (data.isValid) {
        setVerificationStatus('verified');
        toast.success("Business license verified successfully!");
      } else {
        setVerificationStatus('failed');
        toast.error("Business license verification failed. Please check your information.");
      }
    } catch (error) {
      console.error('License verification error:', error);
      setVerificationStatus('failed');
      toast.error("Failed to verify business license. Please try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Business License Verification</h3>
        <Badge variant={verificationStatus === 'verified' ? 'secondary' : 'default'}>
          {verificationStatus === 'verified' ? 'Verified' : 'Pending Verification'}
        </Badge>
      </div>

      <FormField
        control={form.control}
        name="taxId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business License Number</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your business license number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={handleVerification}
        disabled={isVerifying}
        className="w-full"
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying License...
          </>
        ) : (
          'Verify Business License'
        )}
      </Button>
    </div>
  );
};

export default LicenseVerificationSection;
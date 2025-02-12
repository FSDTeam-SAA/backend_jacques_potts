import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFeaturePayment } from "@/hooks/useFeaturePayment";

interface ManualVerificationSectionProps {
  onVerificationComplete: () => void;
}

export const ManualVerificationSection = ({ onVerificationComplete }: ManualVerificationSectionProps) => {
  const { purchaseFeature, isProcessing } = useFeaturePayment();
  const { toast } = useToast();

  const handleManualVerification = async () => {
    try {
      const success = await purchaseFeature('verification');
      if (success) {
        onVerificationComplete();
        toast({
          title: "Manual Verification Initiated",
          description: "Our team will review your business within 24-48 hours.",
        });
      }
    } catch (error) {
      console.error('Error processing verification payment:', error);
      toast({
        title: "Verification Failed",
        description: "Please try again or choose a different verification method.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h4 className="font-medium mb-2">Option 2: Manual Verification</h4>
      <p className="text-sm text-muted-foreground mb-4">
        Our team will manually verify your business within 24-48 hours.
      </p>
      <Button 
        onClick={handleManualVerification} 
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? "Processing..." : "Pay $100 for Manual Verification"}
      </Button>
    </div>
  );
};
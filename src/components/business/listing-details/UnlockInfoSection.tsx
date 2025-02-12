import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useState } from "react";
import { PaymentMethodCheck } from "@/components/PaymentMethodCheck";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UnlockInfoSectionProps {
  onUnlock: () => void;
}

const UnlockInfoSection = ({ onUnlock }: UnlockInfoSectionProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleUnlock = async () => {
    try {
      const response = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          featureType: "show_more_info",
        },
      });

      if (response.error) throw response.error;
      if (!response.data?.url) throw new Error('No checkout URL received');

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
    }
  };

  return (
    <PaymentMethodCheck isOpen={showPaymentDialog} setIsOpen={setShowPaymentDialog} onPaymentComplete={handleUnlock}>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Additional Information Available</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Unlock detailed financial metrics, customer information, and verified business data.
        </p>
        <Button onClick={() => setShowPaymentDialog(true)} className="w-full sm:w-auto">
          Unlock Additional Info ($5)
        </Button>
      </div>
    </PaymentMethodCheck>
  );
};

export default UnlockInfoSection;
import { useState } from "react";
import { usePayment } from "@/contexts/PaymentContext";
import { usePremiumFeatures } from "@/contexts/PremiumFeaturesContext";
import { toast } from "sonner";

export const useFeaturePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { processPayment } = usePayment();
  const { activateFeature } = usePremiumFeatures();

  const purchaseFeature = async (
    type: "dynamic_filters" | "priority_message" | "loi_submission" | "verification",
    duration?: number
  ) => {
    setIsProcessing(true);
    try {
      const amount = type === "verification" 
        ? 25 
        : type === "loi_submission" 
        ? 20 
        : type === "priority_message" 
        ? 2 
        : 1;

      const success = await processPayment(amount, `${type.replace("_", " ")} purchase`);
      
      if (success) {
        await activateFeature(type, duration);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error processing feature payment:", error);
      toast.error("Failed to process payment");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    purchaseFeature,
    isProcessing,
  };
};
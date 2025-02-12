import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFeaturePayment } from "@/hooks/useFeaturePayment";
import { useState } from "react";

export const VerificationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { purchaseFeature, isProcessing } = useFeaturePayment();

  const handleVerification = async () => {
    const success = await purchaseFeature("verification");
    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Get Verified
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Your Account</DialogTitle>
          <DialogDescription>
            Get verified to unlock premium features and build trust with other users.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Shield className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Enhanced Trust</h4>
                <p className="text-sm text-muted-foreground">
                  Verified users receive 5x more responses
                </p>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Button 
              onClick={handleVerification} 
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Verify Now - $100"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
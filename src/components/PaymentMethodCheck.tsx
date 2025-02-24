import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { set } from "date-fns";

interface PaymentMethodCheckProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onPaymentComplete?: () => void;
}

export function PaymentMethodCheck({
  children,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
  onPaymentComplete,
}: PaymentMethodCheckProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

    // console.log("externalIsOpen",externalIsOpen, "externalSetIsOpen",externalSetIsOpen, "i am from payment method check");

  const isControlled = externalIsOpen !== undefined && externalSetIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? externalSetIsOpen : setInternalIsOpen;

  const handleAddPaymentMethod = async () => {
    try {
      const response = await supabase.functions.invoke( 
        "create-checkout-session",
        {
          body: { featureType: "setup_intent" },
        }
      );

      if (response.error) throw response.error; 
      if (!response.data?.url) throw new Error("No checkout URL received");

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error setting up payment method:", error);
      toast.error("Failed to set up payment method");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  console.log(setIsOpen, isOpen, "i am from payment method check");

  return (
    <>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Method Required</DialogTitle>
            <DialogDescription>
              To access premium features, you need to add a payment method
              first.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

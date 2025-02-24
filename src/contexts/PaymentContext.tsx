import { supabase } from "@/integrations/supabase/client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";


// interface CardDetails {
//   lastFour: string;
//   expiryMonth: string;
//   expiryYear: string;
//   brand: string;
// }

interface PaymentContextType {
  // savedCard: CardDetails | null;
  // setSavedCard: (card: CardDetails | null) => void;
  processPayment: (amount: number, description: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  // const [savedCard, setSavedCard] = useState<CardDetails | null>(null);


  const processPayment = async (amount: number, description: string): Promise<boolean> => {
    try {
      // Step 1: Request a Payment Intent from the backend
      const response = await supabase.functions.invoke("create-payment-intent", {
        body: { amount, currency: "usd", description },
      });
  
      if (response.error) throw response.error;
      const { client_secret } = response.data;
  
      if (!client_secret) {
        throw new Error("No client secret received");
      }
  
      // Step 2: Confirm the Payment on the frontend
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      if (!stripe) throw new Error("Stripe failed to initialize");
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret);
  
      if (error) {
        toast.error(error.message || "Payment failed. Please try again.");
        return false;
      }
  
      if (paymentIntent.status === "succeeded") {
        toast.success(`Payment of $${amount} processed successfully`);
        return true;
      } else {
        toast.error("Payment processing failed.");
        return false;
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
      return false;
    }
  };
  
 
  return (
    <PaymentContext.Provider value={{ processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};


// Remove the custom loadStripe function

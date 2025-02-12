import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface CardDetails {
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  brand: string;
}

interface PaymentContextType {
  savedCard: CardDetails | null;
  setSavedCard: (card: CardDetails | null) => void;
  processPayment: (amount: number, description: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedCard, setSavedCard] = useState<CardDetails | null>(null);

  const processPayment = async (amount: number, description: string): Promise<boolean> => {
    if (!savedCard) {
      toast.error("Please add a payment method in billing settings");
      return false;
    }

    try {
      // Simulated payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Payment of $${amount} processed successfully`);
      return true;
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      return false;
    }
  };

  return (
    <PaymentContext.Provider value={{ savedCard, setSavedCard, processPayment }}>
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
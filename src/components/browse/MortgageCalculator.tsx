import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MortgageCalculatorProps {
  listingId: string;
  propertyPrice: number;
}

const MortgageCalculator = ({ listingId, propertyPrice }: MortgageCalculatorProps) => {
  const { toast } = useToast();
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = async () => {
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalInterest = (monthly * numberOfPayments) - loanAmount;
    const totalPayment = monthly * numberOfPayments;

    setMonthlyPayment(monthly);

    try {
      const { error } = await supabase
        .from('mortgage_calculations')
        .insert({
          listing_id: listingId,
          loan_amount: loanAmount,
          down_payment: downPayment,
          interest_rate: interestRate,
          loan_term: loanTerm,
          monthly_payment: monthly,
          total_interest: totalInterest,
          total_payment: totalPayment
        });

      if (error) throw error;
      toast({
        title: "Calculation saved",
        description: "Your mortgage calculation has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving calculation:', error);
      toast({
        title: "Error",
        description: "Failed to save calculation. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Mortgage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Down Payment</Label>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            min={0}
            max={propertyPrice}
          />
        </div>
        <div className="space-y-2">
          <Label>Interest Rate (%)</Label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min={0}
            max={20}
            step={0.1}
          />
        </div>
        <div className="space-y-2">
          <Label>Loan Term (years)</Label>
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            min={1}
            max={40}
          />
        </div>
        <Button onClick={calculateMortgage} className="w-full">
          Calculate
        </Button>
        {monthlyPayment && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-lg font-semibold">
              Monthly Payment: ${monthlyPayment.toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, FileText, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LoanApplicationFormProps {
  listingId: string;
}

interface LoanApplicationData {
  loan_amount: number;
  loan_term: number;
  credit_score?: number;
}

const LoanApplicationForm = ({ listingId }: LoanApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: providers } = useQuery({
    queryKey: ["financing-providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("financing_providers")
        .select("*")
        .eq("status", "active");
      
      if (error) throw error;
      return data;
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoanApplicationData>();

  const onSubmit = async (data: LoanApplicationData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("loan_applications")
        .insert({
          listing_id: listingId,
          loan_amount: data.loan_amount,
          loan_term: data.loan_term,
          credit_score: data.credit_score,
        });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your loan application has been submitted successfully."
      });
    } catch (error) {
      console.error("Error submitting loan application:", error);
      toast({
        title: "Error",
        description: "Failed to submit loan application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Loan Application
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loan_amount">Loan Amount ($)</Label>
            <Input
              id="loan_amount"
              type="number"
              {...register("loan_amount", { required: true, min: 1000 })}
            />
            {errors.loan_amount && (
              <p className="text-sm text-red-500">Please enter a valid loan amount</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="loan_term">Loan Term (months)</Label>
            <Input
              id="loan_term"
              type="number"
              {...register("loan_term", { required: true, min: 12, max: 360 })}
            />
            {errors.loan_term && (
              <p className="text-sm text-red-500">Please enter a valid loan term (12-360 months)</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="credit_score">Credit Score (optional)</Label>
            <Input
              id="credit_score"
              type="number"
              {...register("credit_score", { min: 300, max: 850 })}
            />
            {errors.credit_score && (
              <p className="text-sm text-red-500">Please enter a valid credit score (300-850)</p>
            )}
          </div>

          {providers && providers.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label>Available Lenders</Label>
              <div className="grid gap-2">
                {providers.map((provider) => (
                  <div key={provider.id} className="flex items-center gap-2 p-2 border rounded">
                    <Building className="h-4 w-4" />
                    <span>{provider.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Submitting Application..."
            ) : (
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Submit Application
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanApplicationForm;
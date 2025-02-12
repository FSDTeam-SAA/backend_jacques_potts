import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LenderCard from "./components/LenderCard";
import type { LenderProvider } from "./types";

const NativeLenderIntegration = () => {
  const { data: lenders = [] } = useQuery({
    queryKey: ["financing-providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("financing_providers")
        .select("*")
        .eq("status", "active");

      if (error) throw error;
      return data as LenderProvider[];
    },
  });

  const handleApply = async (lenderId: string) => {
    try {
      const { error } = await supabase.from("loan_applications").insert({
        provider_id: lenderId,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Loan application submitted successfully");
    } catch (error) {
      console.error("Error submitting loan application:", error);
      toast.error("Failed to submit loan application");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financing Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lenders.map((lender) => (
          <LenderCard 
            key={lender.id} 
            lender={lender} 
            onApply={handleApply} 
          />
        ))}
      </div>
    </div>
  );
};

export default NativeLenderIntegration;
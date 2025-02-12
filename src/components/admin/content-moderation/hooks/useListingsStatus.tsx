import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useListingsStatus = (refetch: () => void) => {
  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("business_listings")
        .update({ status: "published" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Listing approved successfully");
      refetch();
    } catch (error) {
      console.error("Error approving listing:", error);
      toast.error("Failed to approve listing");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("business_listings")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Listing rejected");
      refetch();
    } catch (error) {
      console.error("Error rejecting listing:", error);
      toast.error("Failed to reject listing");
    }
  };

  return {
    handleApprove,
    handleReject,
  };
};
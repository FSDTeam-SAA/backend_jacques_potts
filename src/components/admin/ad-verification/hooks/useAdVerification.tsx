import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: string;
  created_at: string;
  user_id: string;
  category_id: string;
}

export const useAdVerification = () => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: pendingAds, refetch } = useQuery({
    queryKey: ["pendingAds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Ad[];
    },
  });

  const updateAdStatus = async (adId: string, status: "approved" | "rejected") => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("ads")
        .update({ status })
        .eq("id", adId);

      if (error) throw error;

      toast({
        title: `Ad ${status}`,
        description: `The ad has been ${status} successfully.`,
      });
      refetch();
    } catch (error) {
      console.error("Error updating ad status:", error);
      toast({
        title: "Error",
        description: "Failed to update ad status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    pendingAds,
    isUpdating,
    updateAdStatus,
  };
};
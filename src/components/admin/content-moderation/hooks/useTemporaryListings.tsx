import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTemporaryListings = (onSuccess: () => void) => {
  const generateListingsMutation = useMutation({
    mutationFn: async () => {
      console.log("Starting temporary listings generation...");
      
      try {
        const { error: removeError } = await supabase.rpc('remove_temporary_listings');
        if (removeError) {
          console.error("Error removing existing temporary listings:", removeError);
          throw removeError;
        }
        
        const { error: generateError } = await supabase.rpc('generate_temporary_listings');
        if (generateError) {
          console.error("Error generating temporary listings:", generateError);
          throw generateError;
        }
        
        console.log("Temporary listings generation completed");
      } catch (error) {
        console.error("Error in generate listings process:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Temporary listings generated successfully");
      onSuccess();
    },
    onError: (error) => {
      console.error("Error in generate listings mutation:", error);
      toast.error("Failed to generate temporary listings");
    }
  });

  const removeListingsMutation = useMutation({
    mutationFn: async () => {
      console.log("Starting temporary listings removal...");
      try {
        const { error } = await supabase.rpc('remove_temporary_listings');
        if (error) {
          console.error("Error removing temporary listings:", error);
          throw error;
        }
        console.log("Temporary listings removal completed");
      } catch (error) {
        console.error("Error in remove listings process:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Temporary listings removed successfully");
      onSuccess();
    },
    onError: (error) => {
      console.error("Error in remove listings mutation:", error);
      toast.error("Failed to remove temporary listings");
    }
  });

  return {
    generateListingsMutation,
    removeListingsMutation,
  };
};
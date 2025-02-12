import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTemplateOperations = (refetch: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: any, editingTemplate: any) => {
    setIsLoading(true);
    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from("legal_templates")
          .update(formData)
          .eq("id", editingTemplate.id);
        if (error) throw error;
        toast.success("Template updated successfully");
      } else {
        const { error } = await supabase
          .from("legal_templates")
          .insert([formData]);
        if (error) throw error;
        toast.success("Template created successfully");
      }
      refetch();
      return true;
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTemplateStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("legal_templates")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success("Template status updated successfully");
      refetch();
    } catch (error) {
      console.error("Error updating template status:", error);
      toast.error("Failed to update template status");
    }
  };

  return {
    isLoading,
    handleSubmit,
    toggleTemplateStatus,
  };
};
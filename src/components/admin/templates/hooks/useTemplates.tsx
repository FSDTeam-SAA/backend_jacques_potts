import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTemplateState } from "./useTemplateState";
import { useTemplateOperations } from "./useTemplateOperations";

export const useTemplates = () => {
  const { data: templates, refetch } = useQuery({
    queryKey: ["legal-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const {
    isDialogOpen,
    setIsDialogOpen,
    editingTemplate,
    formData,
    setFormData,
    handleEditClick,
    handleAddNew,
  } = useTemplateState();

  const { isLoading, handleSubmit, toggleTemplateStatus } = useTemplateOperations(refetch);

  const handleFormSubmit = async () => {
    const success = await handleSubmit(formData, editingTemplate);
    if (success) {
      setIsDialogOpen(false);
    }
  };

  return {
    templates,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    editingTemplate,
    formData,
    setFormData,
    handleEditClick,
    handleAddNew,
    handleSubmit: handleFormSubmit,
    toggleTemplateStatus,
  };
};
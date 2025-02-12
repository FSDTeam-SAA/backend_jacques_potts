import { useState } from "react";

interface TemplateFormData {
  id?: string;
  title: string;
  category: string;
  content: string;
  description: string;
}

export const useTemplateState = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [formData, setFormData] = useState<TemplateFormData>({
    title: "",
    category: "",
    content: "",
    description: "",
  });

  const handleEditClick = (template: any) => {
    setEditingTemplate(template);
    setFormData({
      id: template.id,
      title: template.title,
      category: template.category,
      content: template.content,
      description: template.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingTemplate(null);
    setFormData({
      title: "",
      category: "",
      content: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    editingTemplate,
    formData,
    setFormData,
    handleEditClick,
    handleAddNew,
  };
};
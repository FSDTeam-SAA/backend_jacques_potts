import { useTemplates } from "./hooks/useTemplates";
import TemplateTable from "./TemplateTable";
import TemplateDialog from "./TemplateDialog";
import TemplateHeader from "./components/TemplateHeader";
import { Template } from "@/types/templates";

const TemplateManagement = () => {
  const {
    templates,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    formData,
    setFormData,
    handleEditClick,
    handleAddNew,
    handleSubmit,
    toggleTemplateStatus,
  } = useTemplates();

  return (
    <div className="space-y-6">
      <TemplateHeader onAddNew={handleAddNew} />

      <TemplateTable
        templates={templates || []}
        onEditClick={handleEditClick}
        onToggleStatus={toggleTemplateStatus}
      />

      <TemplateDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        title={formData.id ? "Edit Template" : "Create New Template"}
      />
    </div>
  );
};

export default TemplateManagement;
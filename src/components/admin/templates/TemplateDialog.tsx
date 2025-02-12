import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TemplateFormFields from "./form/TemplateFormFields";
import TemplateDialogActions from "./form/TemplateDialogActions";

interface TemplateFormData {
  id?: string;
  title: string;
  category: string;
  content: string;
  description: string;
}

interface TemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: TemplateFormData;
  setFormData: (data: TemplateFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const TemplateDialog = ({
  isOpen,
  onClose,
  title,
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: TemplateDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the details for the legal template below.
          </DialogDescription>
        </DialogHeader>
        <TemplateFormFields formData={formData} setFormData={setFormData} />
        <TemplateDialogActions
          onClose={onClose}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
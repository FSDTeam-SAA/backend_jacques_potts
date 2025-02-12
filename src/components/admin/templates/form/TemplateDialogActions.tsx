import { Button } from "@/components/ui/button";

interface TemplateDialogActionsProps {
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const TemplateDialogActions = ({
  onClose,
  onSubmit,
  isLoading,
}: TemplateDialogActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default TemplateDialogActions;
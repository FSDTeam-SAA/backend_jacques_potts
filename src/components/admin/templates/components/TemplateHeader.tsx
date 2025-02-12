import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TemplateHeaderProps {
  onAddNew: () => void;
}

const TemplateHeader = ({ onAddNew }: TemplateHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold">Legal Templates</h2>
        <p className="text-sm text-muted-foreground">
          Manage legal document templates and access settings
        </p>
      </div>
      <Button onClick={onAddNew}>
        <Plus className="h-4 w-4 mr-1" />
        Add New Template
      </Button>
    </div>
  );
};

export default TemplateHeader;
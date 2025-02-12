import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TemplateFormData {
  id?: string;
  title: string;
  category: string;
  content: string;
  description: string;
}

interface TemplateFormFieldsProps {
  formData: TemplateFormData;
  setFormData: (data: TemplateFormData) => void;
}

const TemplateFormFields = ({ formData, setFormData }: TemplateFormFieldsProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="Enter template title"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          placeholder="Enter template category"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter template description"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">Content</label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Enter template content"
          className="h-[200px]"
        />
      </div>
    </div>
  );
};

export default TemplateFormFields;
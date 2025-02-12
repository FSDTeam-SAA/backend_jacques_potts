import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Template } from "@/types/templates";
import { Edit, Power } from "lucide-react";

interface TemplateTableProps {
  templates: Template[];
  onEditClick: (template: Template) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const TemplateTable = ({ templates, onEditClick, onToggleStatus }: TemplateTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates?.map((template) => (
          <TableRow key={template.id}>
            <TableCell>{template.title}</TableCell>
            <TableCell>{template.category}</TableCell>
            <TableCell>
              <Badge variant={template.is_active ? "default" : "secondary"}>
                {template.is_active ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(template.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleStatus(template.id, template.is_active)}
              >
                <Power className="h-4 w-4 mr-1" />
                {template.is_active ? "Deactivate" : "Activate"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditClick(template)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TemplateTable;
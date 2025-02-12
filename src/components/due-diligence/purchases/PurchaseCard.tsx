import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PurchaseCardProps {
  id: string;
  package_id: string;
  payment_status: string;
  status: string;
  created_at: string;
  documents: string[];
  due_diligence_packages: {
    name: string;
    description: string;
  };
}

export default function PurchaseCard({
  status,
  payment_status,
  created_at,
  documents,
  due_diligence_packages,
}: PurchaseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{due_diligence_packages.name}</span>
          <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {due_diligence_packages.description}
          </p>
          <div className="text-sm">
            <span className="font-medium">Payment Status:</span>{' '}
            <Badge variant={payment_status === 'completed' ? 'default' : 'secondary'}>
              {payment_status}
            </Badge>
          </div>
          <div className="text-sm">
            <span className="font-medium">Purchased:</span>{' '}
            {new Date(created_at).toLocaleDateString()}
          </div>
          {documents?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Documents</h4>
              <ul className="list-disc list-inside">
                {documents.map((doc, index) => (
                  <li key={index} className="text-sm">{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
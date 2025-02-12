import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LOIStatusBadge from "./LOIStatusBadge";

interface LOICardProps {
  loi: any;
}

const LOICard = ({ loi }: LOICardProps) => {
  return (
    <Card key={loi.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">
            {loi.business_listings.business_name}
          </h3>
          <div className="space-x-2">
            <LOIStatusBadge status={loi.status} type="status" />
            <LOIStatusBadge status={loi.payment_status} type="payment" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Asking Price: ${loi.business_listings.asking_price.toLocaleString()}
          </p>
          <p className="text-sm">{loi.content}</p>
          <p className="text-xs text-muted-foreground">
            Submitted on: {new Date(loi.created_at).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LOICard;
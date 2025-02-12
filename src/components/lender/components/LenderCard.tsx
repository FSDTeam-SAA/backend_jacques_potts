import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";
import { LenderProvider } from "../types";
import LenderActions from "./LenderActions";
import LenderDetails from "./LenderDetails";

interface LenderCardProps {
  lender: LenderProvider;
  onApply: (lenderId: string) => Promise<void>;
}

const LenderCard = ({ lender, onApply }: LenderCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {lender.name}
          </CardTitle>
          <Badge>{lender.provider_type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <LenderDetails lender={lender} />
        <LenderActions lender={lender} onApply={onApply} />
      </CardContent>
    </Card>
  );
};

export default LenderCard;
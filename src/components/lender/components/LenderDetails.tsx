import { CreditCard, DollarSign } from "lucide-react";
import { LenderProvider } from "../types";

interface LenderDetailsProps {
  lender: LenderProvider;
}

const LenderDetails = ({ lender }: LenderDetailsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <DollarSign className="h-4 w-4" />
        <span>Interest Rate: {lender.interest_rate_range?.lower}% - {lender.interest_rate_range?.upper}%</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <CreditCard className="h-4 w-4" />
        <span>Min. Credit Score: {lender.minimum_credit_score}</span>
      </div>
      <div className="text-sm text-muted-foreground">
        Processing Time: {lender.processing_time_days} days
      </div>
    </div>
  );
};

export default LenderDetails;
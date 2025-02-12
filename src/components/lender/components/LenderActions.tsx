import { Button } from "@/components/ui/button";
import { LenderProvider } from "../types";

interface LenderActionsProps {
  lender: LenderProvider;
  onApply: (lenderId: string) => Promise<void>;
}

const LenderActions = ({ lender, onApply }: LenderActionsProps) => {
  return (
    <div className="flex justify-end">
      <Button onClick={() => onApply(lender.id)}>
        Apply Now
      </Button>
    </div>
  );
};

export default LenderActions;
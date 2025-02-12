import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import BrokerRatingForm from "../ratings/BrokerRatingForm";

interface BrokerActionsProps {
  brokerId: string;
}

const BrokerActions = ({ brokerId }: BrokerActionsProps) => {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <Button className="flex-1" variant="outline">
        Contact Broker
      </Button>
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex-1" variant="secondary">
            Rate Broker
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Broker</DialogTitle>
          </DialogHeader>
          <BrokerRatingForm
            brokerId={brokerId}
            onRatingSubmitted={() => setIsRatingDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrokerActions;
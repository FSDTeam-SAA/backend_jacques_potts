import { Card } from "@/components/ui/card";
import BrokerCardHeader from "./BrokerCardHeader";
import BrokerCardContent from "./BrokerCardContent";
import type { BrokerProfile } from "../types";

interface BrokerCardProps {
  broker: BrokerProfile;
}

const BrokerCard = ({ broker }: BrokerCardProps) => {
  return (
    <Card>
      <BrokerCardHeader broker={broker} />
      <BrokerCardContent broker={broker} />
    </Card>
  );
};

export default BrokerCard;
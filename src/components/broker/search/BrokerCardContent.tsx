import { CardContent } from "@/components/ui/card";
import BrokerSpecialties from "./BrokerSpecialties";
import BrokerActions from "./BrokerActions";
import type { BrokerProfile } from "../types";

interface BrokerCardContentProps {
  broker: BrokerProfile;
}

const BrokerCardContent = ({ broker }: BrokerCardContentProps) => {
  return (
    <CardContent>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium">License: {broker.license_number}</p>
          <p className="text-sm">{broker.years_experience} years of experience</p>
        </div>
        <BrokerSpecialties specialties={broker.specialties} />
        <BrokerActions brokerId={broker.user_id} />
      </div>
    </CardContent>
  );
};

export default BrokerCardContent;
import { CardHeader, CardTitle } from "@/components/ui/card";
import BrokerRating from "./BrokerRating";
import type { BrokerProfile } from "../types";

interface BrokerCardHeaderProps {
  broker: BrokerProfile;
}

const BrokerCardHeader = ({ broker }: BrokerCardHeaderProps) => {
  const averageRating = broker.profiles.ratings.length > 0
    ? broker.profiles.ratings.reduce((sum, r) => sum + r.rating, 0) / broker.profiles.ratings.length
    : null;

  return (
    <CardHeader>
      <CardTitle className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{broker.profiles.full_name}</h3>
          <p className="text-sm text-muted-foreground">
            {broker.profiles.city}, {broker.profiles.state}
          </p>
        </div>
        <BrokerRating
          averageRating={averageRating}
          totalRatings={broker.profiles.ratings.length}
        />
      </CardTitle>
    </CardHeader>
  );
};

export default BrokerCardHeader;
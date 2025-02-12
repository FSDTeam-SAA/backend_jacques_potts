import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Trophy } from "lucide-react";
import { MapPin, Building2 } from "lucide-react";
import type { BrokerProfile } from "../types";

interface BrokerHeaderProps {
  broker: BrokerProfile;
  averageRating: number | null;
}

const BrokerHeader = ({ broker, averageRating }: BrokerHeaderProps) => {
  return (
    <div className="flex items-start gap-6">
      <div className="relative">
        <img
          src={broker.profiles.avatar_url || "/placeholder.svg"}
          alt={broker.profiles.full_name}
          className="w-48 h-48 rounded-lg object-cover"
        />
        {broker.verification_status === "approved" && (
          <Badge className="absolute -top-2 -right-2 bg-blue-500">
            <BadgeCheck className="w-4 h-4 mr-1" />
            Verified
          </Badge>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{broker.profiles.full_name}</h1>
          {broker.years_experience >= 10 && (
            <Badge variant="secondary">
              <Trophy className="w-4 h-4 mr-1" />
              Elite Broker
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{broker.profiles.city}, {broker.profiles.state}</span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span>License #: {broker.license_number}</span>
        </div>

        {averageRating !== null && (
          <div className="mt-4">
            <p className="text-lg">
              {averageRating.toFixed(1)} ★ ({broker.profiles.ratings.length} reviews)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerHeader;
import { Star } from "lucide-react";

interface BrokerRatingProps {
  averageRating: number | null;
  totalRatings: number | null;
}

const BrokerRating = ({ averageRating, totalRatings }: BrokerRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span>{averageRating?.toFixed(1) || "N/A"}</span>
      <span className="text-sm text-muted-foreground">
        ({totalRatings || 0})
      </span>
    </div>
  );
};

export default BrokerRating;
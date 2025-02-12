import { Home, Calendar, Car } from "lucide-react";

interface PropertyDetailsProps {
  squareFootage: number;
  yearBuilt: number;
  parkingSpaces: number;
}

const PropertyDetails = ({ squareFootage, yearBuilt, parkingSpaces }: PropertyDetailsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div className="flex items-center gap-1">
        <Home className="h-4 w-4" />
        <span>{squareFootage} sq ft</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <span>{yearBuilt}</span>
      </div>
      <div className="flex items-center gap-1">
        <Car className="h-4 w-4" />
        <span>{parkingSpaces} spaces</span>
      </div>
    </div>
  );
};

export default PropertyDetails;
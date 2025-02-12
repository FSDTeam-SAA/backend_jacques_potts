import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BrokerSpecialtiesCardProps {
  specialties: string[];
}

const BrokerSpecialtiesCard = ({ specialties }: BrokerSpecialtiesCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Specialties</h2>
        <div className="flex flex-wrap gap-2">
          {specialties?.map((specialty) => (
            <Badge key={specialty} variant="outline">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerSpecialtiesCard;
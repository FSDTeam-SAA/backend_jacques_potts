import { Badge } from "@/components/ui/badge";

interface BrokerSpecialtiesProps {
  specialties: string[];
}

const BrokerSpecialties = ({ specialties }: BrokerSpecialtiesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {specialties?.map((specialty) => (
        <Badge key={specialty} variant="secondary">
          {specialty}
        </Badge>
      ))}
    </div>
  );
};

export default BrokerSpecialties;
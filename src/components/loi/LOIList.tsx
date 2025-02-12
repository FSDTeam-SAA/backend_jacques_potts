import { Loader2 } from "lucide-react";
import LOICard from "./LOICard";

interface LOIListProps {
  lois: any[] | null;
  loading: boolean;
}

const LOIList = ({ lois, loading }: LOIListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lois?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No letters of intent found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lois.map((loi) => (
        <LOICard key={loi.id} loi={loi} />
      ))}
    </div>
  );
};

export default LOIList;
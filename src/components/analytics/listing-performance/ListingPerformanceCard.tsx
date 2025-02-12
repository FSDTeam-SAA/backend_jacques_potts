import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ListingPerformanceChart from "./ListingPerformanceChart";
import { useListingPerformanceData } from "./ListingPerformanceData";

const ListingPerformanceCard = () => {
  const { data: listings, isLoading } = useListingPerformanceData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Listing Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ListingPerformanceChart data={listings || []} />
      </CardContent>
    </Card>
  );
};

export default ListingPerformanceCard;
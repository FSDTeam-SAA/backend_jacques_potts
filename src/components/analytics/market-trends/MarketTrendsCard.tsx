import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import MarketTrendsChart from "./MarketTrendsChart";
import { useMarketTrendsData } from "./MarketTrendsData";

const MarketTrendsCard = () => {
  const { data: trends, isLoading } = useMarketTrendsData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Trends by Industry</CardTitle>
      </CardHeader>
      <CardContent>
        <MarketTrendsChart data={trends || []} />
      </CardContent>
    </Card>
  );
};

export default MarketTrendsCard;
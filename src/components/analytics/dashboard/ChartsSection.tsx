import ListingPerformance from "../ListingPerformance";
import UserEngagement from "../UserEngagement";
import MarketTrends from "../MarketTrends";

const ChartsSection = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ListingPerformance />
        <UserEngagement />
      </div>
      <MarketTrends />
    </>
  );
};

export default ChartsSection;
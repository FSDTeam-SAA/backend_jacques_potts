import { Building2, DollarSign, TrendingUp } from "lucide-react";

interface ListingsStatsProps {
  count: number;
}

const ListingsStats = ({ count }: ListingsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-3">
        <Building2 className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold">Total Listings</h3>
          <p className="text-2xl">{count}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-3">
        <DollarSign className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold">Average Price</h3>
          <p className="text-2xl">$500k</p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-3">
        <TrendingUp className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold">Growth Rate</h3>
          <p className="text-2xl">15%</p>
        </div>
      </div>
    </div>
  );
};

export default ListingsStats;
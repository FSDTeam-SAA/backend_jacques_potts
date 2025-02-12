import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatLargeNumber } from "./MarketTrendsFormatters";
import type { TrendData } from "./MarketTrendsData";

interface MarketTrendsChartProps {
  data: TrendData[];
}

const MarketTrendsChart = ({ data }: MarketTrendsChartProps) => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis 
            dataKey="industry" 
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis 
            tickFormatter={formatLargeNumber}
            width={100}
          />
          <Tooltip 
            formatter={(value: number) => [formatLargeNumber(value), "Average Price"]}
          />
          <Area 
            type="monotone" 
            dataKey="averagePrice" 
            stroke="#1a365d"
            fill="#1a365d"
            fillOpacity={0.2}
            name="Average Price"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketTrendsChart;
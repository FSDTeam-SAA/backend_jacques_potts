import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { ListingData } from "./ListingPerformanceData";

interface ListingPerformanceChartProps {
  data: ListingData[];
}

const ListingPerformanceChart = ({ data }: ListingPerformanceChartProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#1a365d" name="Views" />
          <Bar dataKey="lois" fill="#3182ce" name="LOIs" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ListingPerformanceChart;
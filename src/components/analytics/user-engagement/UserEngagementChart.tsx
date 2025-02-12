import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { EngagementData } from "./UserEngagementData";

interface UserEngagementChartProps {
  data: EngagementData[];
}

const UserEngagementChart = ({ data }: UserEngagementChartProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="messages" 
            stroke="#1a365d" 
            name="Messages"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagementChart;
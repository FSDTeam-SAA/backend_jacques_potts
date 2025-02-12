import StatCard from "./StatCard";

interface StatsGridProps {
  stats: {
    totalUsers: number;
    activeListings: number;
    totalLOIs: number;
    totalMessages: number;
  };
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Users" value={stats.totalUsers} />
      <StatCard title="Active Listings" value={stats.activeListings} />
      <StatCard title="Total LOIs" value={stats.totalLOIs} />
      <StatCard title="Messages" value={stats.totalMessages} />
    </div>
  );
};

export default StatsGrid;
import StatsOverview from "./platform-stats/StatsOverview";

const PlatformStats = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Platform Statistics</h2>
        <p className="text-sm text-muted-foreground">
          Overview of key platform metrics and trends
        </p>
      </div>
      <StatsOverview />
    </div>
  );
};

export default PlatformStats;
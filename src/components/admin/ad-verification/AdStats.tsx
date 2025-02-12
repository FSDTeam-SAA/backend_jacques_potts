interface AdStatsProps {
  pendingCount: number;
}

const AdStats = ({ pendingCount }: AdStatsProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Ad Verification</h2>
      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
        {pendingCount} Pending
      </span>
    </div>
  );
};

export default AdStats;
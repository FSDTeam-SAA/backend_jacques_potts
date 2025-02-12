interface ListingsStatsProps {
  temporaryCount: number;
  realCount: number;
}

const ListingsStats = ({ temporaryCount, realCount }: ListingsStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold">Temporary Listings</h3>
        <p className="text-2xl">{temporaryCount}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold">Real Listings</h3>
        <p className="text-2xl">{realCount}</p>
      </div>
    </div>
  );
};

export default ListingsStats;
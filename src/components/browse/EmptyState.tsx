const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-gray-600">No listings found.</p>
      <p className="text-sm text-gray-500 mt-2">
        Check back later for new opportunities.
      </p>
    </div>
  );
};

export default EmptyState;
interface ErrorStateProps {
  error: Error | null;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-red-600">Error loading listings</p>
      <p className="text-sm text-gray-500 mt-2">{error?.message || "An unknown error occurred"}</p>
    </div>
  );
};

export default ErrorState;
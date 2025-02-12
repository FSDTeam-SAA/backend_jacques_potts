import ListingDetailsLoading from "./ListingDetailsLoading";
import ListingDetailsError from "./ListingDetailsError";

interface ListingStatesProps {
  loading: boolean;
  error: Error | null;
}

const ListingStates = ({ loading, error }: ListingStatesProps) => {
  if (loading) {
    return <ListingDetailsLoading />;
  }

  if (error) {
    return <ListingDetailsError error={error} onRetry={() => window.location.reload()} />;
  }

  return null;
};

export default ListingStates;
import { useParams } from "react-router-dom";
import ListingDetails from "@/components/business/ListingDetails";

const ListingDetailsPage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Listing ID is required</div>;
  }

  return <ListingDetails />;
};

export default ListingDetailsPage;
import { useParams } from "react-router-dom";
import RealEstateEditForm from "@/components/real-estate/RealEstateEditForm";

const EditRealEstate = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid listing ID</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <RealEstateEditForm listingId={id} />
    </div>
  );
};

export default EditRealEstate;
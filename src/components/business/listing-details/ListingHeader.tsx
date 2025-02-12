import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListingHeader = () => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      className="mb-6 flex items-center gap-2"
      onClick={() => navigate('/browse')}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Listings
    </Button>
  );
};

export default ListingHeader;
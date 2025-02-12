import { Button } from "@/components/ui/button";
import { Plus, Building2, Home, Package } from "lucide-react";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  return (
    <div className="flex gap-4">
      <Link to="/sell">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Business Listing
        </Button>
      </Link>
      <Link to="/real-estate">
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </Link>
      <Link to="/create-asset">
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </Link>
    </div>
  );
};

export default ActionButtons;
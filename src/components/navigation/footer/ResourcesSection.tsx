import { Link } from "react-router-dom";

const ResourcesSection = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Resources</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/browse" className="text-gray-600 hover:text-gray-900">
            Browse Listings
          </Link>
        </li>
        <li>
          <Link to="/sell" className="text-gray-600 hover:text-gray-900">
            Sell Business
          </Link>
        </li>
        <li>
          <Link to="/due-diligence" className="text-gray-600 hover:text-gray-900">
            Due Diligence
          </Link>
        </li>
        <li>
          <Link to="/resources/escrow-services" className="text-gray-600 hover:text-gray-900">
            Escrow Services
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ResourcesSection;
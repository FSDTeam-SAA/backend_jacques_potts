import { Link } from "react-router-dom";

const LegalSection = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Legal</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/terms" className="text-gray-600 hover:text-gray-900">
            Terms of Service
          </Link>
        </li>
        <li>
          <Link to="/eula" className="text-gray-600 hover:text-gray-900">
            EULA
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LegalSection;
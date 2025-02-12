import { Link } from "react-router-dom";

const SupportSection = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Support</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/help-center" className="text-gray-600 hover:text-gray-900">
            Help Center
          </Link>
        </li>
        <li>
          <Link to="/email-support" className="text-gray-600 hover:text-gray-900">
            Email Support
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SupportSection;
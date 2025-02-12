import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const AboutSection = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">About</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/about-us" className="text-gray-600 hover:text-gray-900">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </li>
        <li>
          <a 
            href="https://www.instagram.com/buybizfast" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            Follow us on Instagram
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutSection;
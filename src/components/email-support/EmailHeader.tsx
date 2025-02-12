import { Mail } from "lucide-react";

const EmailHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-[#1a365d] mb-6">
        Direct Support, Just an Email Away
      </h1>
      <img
        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
        alt="Email support"
        className="w-full h-64 object-cover rounded-lg mb-8"
      />
    </div>
  );
};

export default EmailHeader;
import { CheckCircle } from "lucide-react";

interface SupportCategory {
  title: string;
  description: string;
}

const supportCategories = [
  {
    title: "Technical Support",
    description: "For platform or account issues.",
  },
  {
    title: "Buyer Assistance",
    description: "For help using dynamic filters or contacting sellers.",
  },
  {
    title: "Seller Assistance",
    description: "For questions about listings or verification.",
  },
];

const SupportCategories = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">For faster service, use these subject lines:</h3>
      <ul className="space-y-4">
        {supportCategories.map((category, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold">{category.title}</h4>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportCategories;
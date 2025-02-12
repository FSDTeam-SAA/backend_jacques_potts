import { Mail } from "lucide-react";

const EmailContact = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="bg-[#1a365d] p-4 rounded-full mb-4">
        <Mail className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Email us at:</h2>
      <a 
        href="mailto:confidential@buybizfast.com" 
        className="text-blue-600 hover:text-blue-800 text-lg"
      >
        confidential@buybizfast.com
      </a>
    </div>
  );
};

export default EmailContact;
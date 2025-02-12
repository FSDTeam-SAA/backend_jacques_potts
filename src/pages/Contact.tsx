import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1a365d] mb-6">
          Got Questions? We're Here to Help.
        </h1>
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Customer support"
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-lg text-gray-700 mb-8 text-center">
            At Buy Biz Fast, we value your questions, feedback, and concerns. 
            Whether you're a buyer, seller, or just exploring our platform, 
            our team is ready to assist.
          </p>

          <div className="flex flex-col items-center text-center">
            <div className="bg-[#1a365d] p-4 rounded-full mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <a href="mailto:confidential@buybizfast.com" className="text-blue-600 hover:text-blue-800">
              confidential@buybizfast.com
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-lg text-gray-700">
        <p>We aim to respond to all inquiries within 24 hours.</p>
      </div>
    </div>
  );
};

export default Contact;
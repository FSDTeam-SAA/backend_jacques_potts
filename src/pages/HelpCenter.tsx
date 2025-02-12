import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import HelpHeader from "@/components/help-center/HelpHeader";
import HelpCategories from "@/components/help-center/HelpCategories";

const HelpCenter = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <HelpHeader 
        title="Your Go-To Resource for FAQs and Guidance"
        imageSrc="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      />

      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-lg text-gray-700 mb-8 text-center">
            Need assistance navigating the platform? Our Help Center has everything 
            you need to get started and succeed on Buy Biz Fast.
          </p>

          <HelpCategories />
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-lg text-gray-700 mb-4">
          Can't find what you're looking for?
        </p>
        <Link 
          to="/email-support" 
          className="inline-flex items-center text-[#1a365d] hover:text-blue-800"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Contact our support team
        </Link>
      </div>
    </div>
  );
};

export default HelpCenter;
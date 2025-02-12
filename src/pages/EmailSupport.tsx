import { Card, CardContent } from "@/components/ui/card";
import EmailHeader from "@/components/email-support/EmailHeader";
import EmailContact from "@/components/email-support/EmailContact";
import SupportCategories from "@/components/email-support/SupportCategories";
import ResponseTime from "@/components/email-support/ResponseTime";

const EmailSupport = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <EmailHeader />

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Have a specific question or issue? Our support team is dedicated to 
              helping you navigate the Buy Biz Fast platform.
            </p>
          </div>

          <EmailContact />
          <SupportCategories />
          <ResponseTime />
        </CardContent>
      </Card>

      <div className="text-center text-lg text-gray-700">
        <p>
          We're here to ensure your experience with Buy Biz Fast is seamless and successful!
        </p>
      </div>
    </div>
  );
};

export default EmailSupport;
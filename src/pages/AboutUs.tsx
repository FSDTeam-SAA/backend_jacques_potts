import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, LineChart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1a365d] mb-6">
          Changing How Businesses Change Hands—Fast, Secure, and Trusted
        </h1>
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Business professionals"
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-lg text-gray-700 mb-8">
            At Buy Biz Fast, we're redefining how businesses are bought and sold. Our mission is simple: 
            to create a secure, efficient, and user-friendly marketplace where entrepreneurs and business 
            owners can connect and complete transactions quickly.
          </p>

          <h2 className="text-2xl font-semibold text-[#1a365d] mb-6">What makes us different?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#1a365d] p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Speed</h3>
              <p className="text-gray-600">
                Our platform is designed to help you close deals in 90 days or less.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#1a365d] p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-gray-600">
                With verified buyers and sellers, robust confidentiality tools, and a Global NDA, 
                your business information is always protected.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#1a365d] p-4 rounded-full mb-4">
                <LineChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600">
                Dynamic filters and advanced analytics give you access to the data you need 
                to make informed decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-lg text-gray-700">
        <p>
          Whether you're buying your next opportunity or selling your legacy, 
          Buy Biz Fast is here to make it happen—securely and confidently.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BusinessListingForm from "@/components/BusinessListingForm";
import RealEstateListingForm from "@/components/real-estate/RealEstateListingForm";
import BrokerSignupForm from "@/components/broker/BrokerSignupForm";
import DisclaimerDialog from "@/components/business/DisclaimerDialog";
import AssetForm from "@/components/assets/AssetForm";

const Sell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showBrokerSignup, setShowBrokerSignup] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6 text-center space-y-4">
          <h2 className="text-2xl font-semibold">Sign in to List Your Business</h2>
          <p className="text-muted-foreground">You need to be signed in to create a listing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login?join=true")}
            >
              Create Account
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <DisclaimerDialog 
        open={showDisclaimer} 
        onAccept={() => setShowDisclaimer(false)} 
      />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Create a Listing</h1>
        <p className="text-gray-600">Choose the type of listing you want to create</p>
      </div>

      {showBrokerSignup ? (
        <BrokerSignupForm onCancel={() => setShowBrokerSignup(false)} />
      ) : (
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>
          <TabsContent value="business">
            <Card className="p-6">
              <BusinessListingForm />
            </Card>
          </TabsContent>
          <TabsContent value="real-estate">
            <Card className="p-6">
              <RealEstateListingForm />
            </Card>
          </TabsContent>
          <TabsContent value="assets">
            <Card className="p-6">
              <AssetForm />
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-2">Are you a broker?</p>
        <Button variant="outline" onClick={() => setShowBrokerSignup(true)}>
          Sign up as a Broker
        </Button>
      </div>
    </div>
  );
};

export default Sell;
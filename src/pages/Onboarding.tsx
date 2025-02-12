import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import PersonalInfoForm from "@/components/onboarding/PersonalInfoForm";
import VerificationBenefits from "@/components/onboarding/VerificationBenefits";
import DashboardIntro from "@/components/onboarding/DashboardIntro";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleStepComplete = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
      toast.success("Welcome to Buy Biz Fast!");
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  i <= step ? "bg-primary text-white" : "bg-secondary text-primary"
                }`}
              >
                {i}
              </div>
              {i < 3 && (
                <div
                  className={`h-1 w-8 mx-2 ${
                    i < step ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {step === 1
              ? "Complete Your Profile"
              : step === 2
              ? "Verify Your Account"
              : "Welcome to Buy Biz Fast"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && <PersonalInfoForm onComplete={handleStepComplete} />}
          {step === 2 && <VerificationBenefits onComplete={handleStepComplete} />}
          {step === 3 && <DashboardIntro onComplete={handleStepComplete} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
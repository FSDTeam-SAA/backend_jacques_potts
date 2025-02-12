import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface DashboardIntroProps {
  onComplete: () => void;
}

const DashboardIntro = ({ onComplete }: DashboardIntroProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-success" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Thank you for completing your profile!
        </h2>
        <p className="text-muted-foreground">
          You're now ready to explore the marketplace. If you haven't verified your
          account yet, you can always do so from your dashboard to gain additional
          benefits.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <Button onClick={onComplete} className="w-full">
          Go to Dashboard
        </Button>
        <Button variant="outline" onClick={onComplete} className="w-full">
          Get Verified Now
        </Button>
      </div>
    </div>
  );
};

export default DashboardIntro;
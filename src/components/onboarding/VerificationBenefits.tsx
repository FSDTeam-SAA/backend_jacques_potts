import { Shield, Search, Lock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationDialog } from "@/components/verification/VerificationDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface VerificationBenefitsProps {
  onComplete: () => void;
}

const VerificationBenefits = ({ onComplete }: VerificationBenefitsProps) => {
  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Trust",
      description: "Verified users are more likely to receive inquiries and responses",
    },
    {
      icon: Search,
      title: "Increased Visibility",
      description: "Verified profiles gain a higher ranking in search results",
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description: "Build confidence with buyers and sellers by verifying your identity",
    },
    {
      icon: Award,
      title: "Exclusive Badge",
      description: "Stand out with a verified badge on your profile and listings",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-lg border bg-card"
          >
            <benefit.icon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <VerificationDialog />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Skip for now
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Verified users receive 5x more responses and are 3x more likely to
                complete successful transactions. You can always verify your account
                later from your dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Go back</AlertDialogCancel>
              <AlertDialogAction onClick={onComplete}>
                Skip verification
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VerificationBenefits;
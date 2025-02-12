import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface DisclaimerDialogProps {
  open: boolean;
  onAccept: () => void;
}

const DisclaimerDialog = ({ open, onAccept }: DisclaimerDialogProps) => {
  const navigate = useNavigate();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Mandatory Agreement Before Proceeding
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Please read and agree to the following terms to ensure your protection and the security of all parties involved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <ScrollArea className="h-[60vh] mt-4 pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Global Non-Disclosure Agreement (NDA)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Confidentiality of Information:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>All information shared through this platform, including but not limited to business details, financial data, and proprietary assets, will remain confidential.</li>
                    <li>Users (both buyers and sellers) are prohibited from sharing, duplicating, or distributing any information obtained through this platform without explicit written consent from the information owner.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Restricted Use:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Any information provided by other users must be used solely for evaluating business opportunities on this platform.</li>
                    <li>Unauthorized use of data for competitive purposes or third-party disclosure is strictly prohibited.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Terms of Use and Liability Disclaimer</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">User Responsibility:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>By listing a business, you affirm that the information provided is accurate and truthful to the best of your knowledge.</li>
                    <li>Users are solely responsible for the integrity, legality, and completeness of the information shared in their listings.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">No Liability Clause:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>We act solely as an intermediary platform and are not liable for the accuracy, legality, or viability of listed businesses.</li>
                    <li>We do not guarantee the success, profitability, or outcomes of transactions conducted through this platform.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel onClick={() => navigate("/")}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>I Agree</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DisclaimerDialog;
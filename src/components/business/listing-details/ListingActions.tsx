import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PaymentMethodCheck } from "@/components/PaymentMethodCheck";
import ContactSeller from "./ContactSeller";
import LetterOfIntentForm from "../LetterOfIntentForm";
import type { BusinessListing } from "@/types/supabase";

interface ListingActionsProps {
  listing: BusinessListing;
  userId?: string;
}

const ListingActions = ({ listing, userId }: ListingActionsProps) => {
  const [showLoiForm, setShowLoiForm] = useState(false);

  if (!userId) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
        <p className="text-gray-600 mb-4">
          Sign in to contact the seller and access premium features
        </p>
        <Link to="/login">
          <Button className="w-full">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <PaymentMethodCheck>
      <div className="space-y-6">
        <ContactSeller listing={listing} />
        
        {userId !== listing.user_id && (
          <Dialog open={showLoiForm} onOpenChange={setShowLoiForm}>
            <DialogTrigger asChild>
              <Button className="w-full">
                Submit Letter of Intent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <LetterOfIntentForm
                listingId={listing.id}
                sellerId={listing.user_id!}
                onSuccess={() => setShowLoiForm(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </PaymentMethodCheck>
  );
};

export default ListingActions;
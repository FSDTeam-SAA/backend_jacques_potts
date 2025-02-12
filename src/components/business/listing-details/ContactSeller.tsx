import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageForm } from "@/components/messaging/MessageForm";
import type { BusinessListing } from "@/types/supabase";

interface ContactSellerProps {
  listing: BusinessListing;
}

const ContactSeller = ({ listing }: ContactSellerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Seller</CardTitle>
      </CardHeader>
      <CardContent>
        <MessageForm 
          listingId={listing.id} 
          receiverId={listing.user_id!} 
        />
      </CardContent>
    </Card>
  );
};

export default ContactSeller;
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import type { Asset } from "@/types/business";
import { PaymentMethodCheck } from "@/components/PaymentMethodCheck";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MessageForm } from "@/components/messaging/MessageForm";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleContact = () => {
    if (!user) {
      toast.error("Please sign in to contact sellers");
      navigate("/login");
      return;
    }
    
    if (user?.id === asset.user_id) {
      toast.error("You cannot contact yourself about your own asset");
      return;
    }
    setShowMessageDialog(true);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="relative">
        {asset.image_url ? (
          <img
            src={asset.image_url}
            alt={asset.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
            No Image
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{asset.title}</h3>
          <Badge>{asset.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{asset.description}</p>
        <div className="space-y-2">
          <Badge variant="outline">{asset.condition}</Badge>
          <p className="text-sm text-muted-foreground">{asset.location}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold text-lg">
            ${asset.price.toLocaleString()}
          </span>
          <Button size="sm" onClick={handleContact}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Seller
          </Button>
        </div>
      </CardFooter>

      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
          </DialogHeader>
          <MessageForm
            receiverId={asset.user_id}
            onMessageSent={() => setShowMessageDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AssetCard;
import { Card, CardContent } from "@/components/ui/card";
import { MessageForm } from "@/components/messaging/MessageForm";

interface ContactBrokerCardProps {
  brokerId: string;
  brokerName: string;
}

const ContactBrokerCard = ({ brokerId, brokerName }: ContactBrokerCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Contact Broker</h2>
        <MessageForm receiverId={brokerId} />
      </CardContent>
    </Card>
  );
};

export default ContactBrokerCard;
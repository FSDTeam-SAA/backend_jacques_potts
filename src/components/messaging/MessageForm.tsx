import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePayment } from "@/contexts/PaymentContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface MessageFormProps {
  receiverId: string;
  listingId?: string;
  onMessageSent?: () => void;
}

export function MessageForm({ listingId, receiverId, onMessageSent }: MessageFormProps) {
  const [content, setContent] = useState("");
  const [isPriority, setIsPriority] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { processPayment } = usePayment();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to send messages");
      return;
    }
    
    setIsSending(true);

    try {
      if (isPriority) {
        const success = await processPayment(2, "Priority Message");
        if (!success) {
          toast.error("Payment failed. Please try again.");
          return;
        }
      }

      const { error } = await supabase
        .from("messages")
        .insert({
          content,
          listing_id: listingId,
          receiver_id: receiverId,
          sender_id: user.id,
          is_priority: isPriority,
          read: false,
        });

      if (error) throw error;

      toast.success("Message sent successfully!");
      setContent("");
      setIsPriority(false);
      onMessageSent?.();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here..."
        className="min-h-[100px]"
        required
      />
      
      <div className="flex items-center gap-4">
        <Button 
          type="submit" 
          disabled={isSending}
          className="flex-1"
        >
          {isSending ? "Sending..." : "Send Message"}
        </Button>
        
        <Button
          type="button"
          variant={isPriority ? "default" : "outline"}
          onClick={() => setIsPriority(!isPriority)}
          className="whitespace-nowrap"
        >
          Priority ($2) {isPriority && "✓"}
        </Button>
      </div>
    </form>
  );
}
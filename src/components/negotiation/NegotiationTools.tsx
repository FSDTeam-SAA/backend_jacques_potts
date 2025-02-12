import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { NegotiationMessageType } from "./types";

interface NegotiationToolsProps {
  listingId?: string;
}

const NegotiationTools = ({ listingId }: NegotiationToolsProps) => {
  const { data: messages, refetch } = useQuery({
    queryKey: ['negotiation-messages', listingId],
    queryFn: async () => {
      if (!listingId) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles!sender_id (
            full_name
          )
        `)
        .eq('listing_id', listingId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as NegotiationMessageType[];
    },
    enabled: !!listingId
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!listingId) throw new Error("No listing selected");
      
      const { error } = await supabase
        .from('messages')
        .insert({
          listing_id: listingId,
          content,
          sender_id: (await supabase.auth.getUser()).data.user?.id,
          is_priority: false
        });

      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      toast.success("Message sent successfully");
    },
    onError: () => {
      toast.error("Failed to send message");
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5" />
          Negotiation Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MessageList messages={messages || []} />
          <MessageInput 
            onSend={(message) => sendMessage.mutate(message)}
            isLoading={sendMessage.isPending}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NegotiationTools;
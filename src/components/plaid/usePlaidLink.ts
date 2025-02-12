import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const usePlaidLinkToken = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Error",
            description: "Please log in to connect your bank account.",
            variant: "destructive",
          });
          return;
        }

        console.log('Fetching Plaid link token...');
        const { data, error } = await supabase.functions.invoke('create-plaid-link-token', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          console.error('Error invoking function:', error);
          throw error;
        }

        if (!data?.link_token) {
          console.error('No link token received:', data);
          throw new Error('No link token received');
        }

        console.log('Link token received successfully');
        setLinkToken(data.link_token);
      } catch (error) {
        console.error('Error getting link token:', error);
        toast({
          title: "Error",
          description: "Failed to initialize bank connection. Please try again.",
          variant: "destructive",
        });
      }
    };

    getLinkToken();
  }, [toast]);

  return linkToken;
};

export const usePlaidExchange = () => {
  const { toast } = useToast();

  const exchangeToken = async (publicToken: string, institutionName: string | undefined) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const { error } = await supabase.functions.invoke('plaid-token-exchange', {
        body: {
          publicToken: publicToken,
          institutionName: institutionName,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your bank account has been connected successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to connect bank account. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return exchangeToken;
};
import { useState } from 'react';
import { PlaidButton } from './PlaidButton';
import { usePlaidLinkToken, usePlaidExchange } from './usePlaidLink';

interface PlaidLinkProps {
  onSuccess?: () => void;
}

export function PlaidLink({ onSuccess }: PlaidLinkProps) {
  const [loading, setLoading] = useState(false);
  const linkToken = usePlaidLinkToken();
  const exchangeToken = usePlaidExchange();

  const handleSuccess = async (publicToken: string, metadata: any) => {
    setLoading(true);
    try {
      const success = await exchangeToken(publicToken, metadata.institution?.name);
      if (success) {
        onSuccess?.();
      }
    } catch (error) {
      console.error('Error exchanging Plaid token:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlaidButton
      linkToken={linkToken}
      onSuccess={handleSuccess}
      loading={loading}
    />
  );
}
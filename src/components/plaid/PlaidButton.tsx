import { Button } from '@/components/ui/button';
import { usePlaidLink } from 'react-plaid-link';
import { Loader2 } from "lucide-react";

interface PlaidButtonProps {
  linkToken: string | null;
  onSuccess: (publicToken: string, metadata: any) => void;
  onExit?: (err: any, metadata: any) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PlaidButton = ({ 
  linkToken, 
  onSuccess, 
  onExit, 
  disabled, 
  loading 
}: PlaidButtonProps) => {
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    onExit,
  });

  return (
    <Button
      variant="outline"
      onClick={() => open()}
      disabled={!ready || disabled || !linkToken || loading}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        "Connect Bank Account"
      )}
    </Button>
  );
};
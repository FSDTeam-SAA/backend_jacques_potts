import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface DocumentVerificationProps {
  documentUrl: string;
  documentType: string;
  onVerificationComplete?: (result: boolean) => void;
}

const DocumentVerification = ({ 
  documentUrl, 
  documentType,
  onVerificationComplete 
}: DocumentVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');

  const verifyDocument = async () => {
    setIsVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-document', {
        body: {
          documentUrl,
          documentType
        }
      });

      if (error) throw error;

      if (data.success) {
        setVerificationStatus('verified');
        toast.success('Document verified successfully');
        onVerificationComplete?.(true);
      } else {
        setVerificationStatus('failed');
        toast.error('Document verification failed');
        onVerificationComplete?.(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('failed');
      toast.error('Failed to verify document');
      onVerificationComplete?.(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {verificationStatus === 'pending' && (
        <Button
          onClick={verifyDocument}
          disabled={isVerifying}
          variant="outline"
          className="gap-2"
        >
          {isVerifying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Verify Document'
          )}
        </Button>
      )}
      
      {verificationStatus === 'verified' && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Verified</span>
        </div>
      )}
      
      {verificationStatus === 'failed' && (
        <div className="flex items-center gap-2 text-red-600">
          <XCircle className="h-5 w-5" />
          <span>Verification Failed</span>
        </div>
      )}
    </div>
  );
};

export default DocumentVerification;
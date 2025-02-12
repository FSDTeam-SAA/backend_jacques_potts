import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TwoFactorToggle from "./two-factor-auth/TwoFactorToggle";
import QRCodeDisplay from "./two-factor-auth/QRCodeDisplay";
import BackupCodes from "./two-factor-auth/BackupCodes";
import { use2FASetup } from "./two-factor-auth/use2FASetup";

const TwoFactorAuth = () => {
  const {
    isEnabled,
    qrCodeUrl,
    backupCodes,
    isLoading,
    handleToggle2FA,
  } = use2FASetup();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TwoFactorToggle 
          isEnabled={isEnabled} 
          onToggle={handleToggle2FA} 
        />
        
        {qrCodeUrl && (
          <div className="space-y-4">
            <QRCodeDisplay qrCodeUrl={qrCodeUrl} />
            <BackupCodes codes={backupCodes} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;
import { FormItem } from "@/components/ui/form";

interface QRCodeDisplayProps {
  qrCodeUrl: string | null;
}

const QRCodeDisplay = ({ qrCodeUrl }: QRCodeDisplayProps) => {
  if (!qrCodeUrl) return null;

  return (
    <div>
      <h4 className="font-medium mb-2">Scan QR Code</h4>
      <img
        src={qrCodeUrl}
        alt="2FA QR Code"
        className="w-48 h-48 mx-auto"
      />
    </div>
  );
};

export default QRCodeDisplay;
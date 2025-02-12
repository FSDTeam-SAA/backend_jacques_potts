import { FormItem } from "@/components/ui/form";

interface BackupCodesProps {
  codes: string[];
}

const BackupCodes = ({ codes }: BackupCodesProps) => {
  if (!codes.length) return null;

  return (
    <div>
      <h4 className="font-medium mb-2">Backup Codes</h4>
      <p className="text-sm text-muted-foreground mb-2">
        Save these backup codes in a secure place. You can use them to
        access your account if you lose your authenticator device.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {codes.map((code, index) => (
          <code
            key={index}
            className="bg-muted p-2 rounded text-sm font-mono"
          >
            {code}
          </code>
        ))}
      </div>
    </div>
  );
};

export default BackupCodes;
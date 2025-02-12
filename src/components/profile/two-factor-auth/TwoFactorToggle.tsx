import { Switch } from "@/components/ui/switch";

interface TwoFactorToggleProps {
  isEnabled: boolean;
  onToggle: () => Promise<void>;
}

const TwoFactorToggle = ({ isEnabled, onToggle }: TwoFactorToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">Enable 2FA</h3>
        <p className="text-sm text-muted-foreground">
          Use an authenticator app to generate verification codes
        </p>
      </div>
      <Switch checked={isEnabled} onCheckedChange={onToggle} />
    </div>
  );
};

export default TwoFactorToggle;
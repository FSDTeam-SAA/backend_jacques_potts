import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataExportSection } from "./privacy-center/DataExportSection";
import { AccountDeletionSection } from "./privacy-center/AccountDeletionSection";

export function PrivacyCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Center</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Your Data Rights</h3>
          <p className="text-sm text-muted-foreground">
            Under GDPR and other privacy regulations, you have the right to access,
            export, and request deletion of your personal data.
          </p>
        </div>

        <div className="space-y-4">
          <DataExportSection />
          <AccountDeletionSection />
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">System Documentation</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Data Retention Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The system maintains the following default retention periods:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Security logs: 90 days</li>
              <li>User behavior logs: 30 days</li>
              <li>Transaction logs: 365 days</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soft Delete Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Soft delete functionality is implemented for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Business Listings (includes deletion reason)</li>
              <li>Messages</li>
              <li>Property Documents</li>
            </ul>
            <p className="mt-4">An <code>active_business_listings</code> view is available that shows only non-deleted listings.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Trail</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The system maintains an audit trail through:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automatic logging of all deletions in the security_logs table</li>
              <li>Tracking of deletion timestamps and reasons where applicable</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automated Cleanup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The system automatically:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Removes expired security logs based on retention period</li>
              <li>Removes expired user behavior logs based on retention period</li>
              <li>Archives completed transactions older than the retention period</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Row Level Security ensures:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users can only view published listings that haven't been deleted</li>
              <li>Automatic filtering of soft-deleted records</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;
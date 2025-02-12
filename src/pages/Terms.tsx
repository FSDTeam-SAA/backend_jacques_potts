import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using our service, you agree to be bound by these Terms of Service.</p>

          <h2>2. User Responsibilities</h2>
          <ul>
            <li>Provide accurate information</li>
            <li>Maintain confidentiality of account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not engage in fraudulent activities</li>
          </ul>

          <h2>3. Business Listings</h2>
          <p>Users who list businesses must:</p>
          <ul>
            <li>Have legal authority to sell the business</li>
            <li>Provide accurate business information</li>
            <li>Maintain confidentiality of sensitive information</li>
            <li>Update listing information as needed</li>
          </ul>

          <h2>4. Transactions</h2>
          <p>Our platform:</p>
          <ul>
            <li>Facilitates connections between buyers and sellers</li>
            <li>Does not guarantee business valuations</li>
            <li>Is not responsible for transaction outcomes</li>
            <li>Charges fees for premium services</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>Users retain their intellectual property rights while granting us license to:</p>
          <ul>
            <li>Display listing content</li>
            <li>Promote listings</li>
            <li>Use feedback for service improvement</li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>Our service is provided "as is" without warranties. We are not liable for:</p>
          <ul>
            <li>Business transaction outcomes</li>
            <li>User-provided information accuracy</li>
            <li>Third-party services</li>
          </ul>

          <h2>7. Termination</h2>
          <p>We reserve the right to terminate or suspend accounts that:</p>
          <ul>
            <li>Violate these terms</li>
            <li>Engage in fraudulent activity</li>
            <li>Misuse our platform</li>
          </ul>

          <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;
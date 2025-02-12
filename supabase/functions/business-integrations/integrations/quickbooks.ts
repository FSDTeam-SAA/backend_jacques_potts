export const handleQuickbooksIntegration = async ({ origin }: { origin: string }) => {
  const quickbooksClientId = Deno.env.get('QUICKBOOKS_CLIENT_ID');

  console.log(quickbooksClientId);

  if (!quickbooksClientId) {
    throw new Error('QuickBooks client ID not configured');
  }
  
  const state = crypto.randomUUID();
  
  return {
    authUrl: 'https://appcenter.intuit.com/connect/oauth2',
    metadata: {
      client_id: quickbooksClientId,
      response_type: 'code',
      scope: 'com.intuit.quickbooks.accounting',
      redirect_uri: `${origin}/auth/quickbooks/callback`,
      state: state
    }
  };
};
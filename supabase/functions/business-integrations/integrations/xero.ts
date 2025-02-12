export const handleXeroIntegration = async ({ origin }: { origin: string }) => {
  const xeroClientId = Deno.env.get('XERO_CLIENT_ID');
  if (!xeroClientId) {
    throw new Error('Xero client ID not configured');
  }
  
  const state = crypto.randomUUID();
  
  return {
    authUrl: 'https://login.xero.com/identity/connect/authorize',
    metadata: {
      client_id: xeroClientId,
      response_type: 'code',
      scope: 'accounting.transactions accounting.reports.read',
      redirect_uri: `${origin}/auth/xero/callback`,
      state: state
    }
  };
};
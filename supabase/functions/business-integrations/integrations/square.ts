export const handleSquareIntegration = async ({ origin }: { origin: string }) => {
  const squareClientId = Deno.env.get('SQUARE_CLIENT_ID');
  const squareSecret = Deno.env.get('SQUARE_CLIENT_SECRET');
  
  if (!squareClientId || !squareSecret) {
    console.error('Square credentials not configured');
    throw new Error('Integration temporarily unavailable. Please try another verification method.');
  }
  
  const state = crypto.randomUUID();
  const redirectUri = `${origin}/auth/square/callback`;
  
  const authUrl = new URL('https://connect.squareup.com/oauth2/authorize');
  authUrl.searchParams.append('client_id', squareClientId);
  authUrl.searchParams.append('scope', 'MERCHANT_PROFILE_READ ORDERS_READ ITEMS_READ');
  authUrl.searchParams.append('session_type', 'MOBILE_INSTALL');
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('state', state);
  
  return {
    authUrl: authUrl.toString(),
    metadata: {
      state,
      redirect_uri: redirectUri
    }
  };
};
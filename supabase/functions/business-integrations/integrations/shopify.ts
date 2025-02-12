export const handleShopifyIntegration = async ({ origin }: { origin: string }) => {
  const shopifyClientId = Deno.env.get('SHOPIFY_CLIENT_ID');
  if (!shopifyClientId) {
    throw new Error('Shopify client ID not configured');
  }
  
  const state = crypto.randomUUID();
  
  return {
    authUrl: 'https://accounts.shopify.com/oauth/authorize',
    metadata: {
      client_id: shopifyClientId,
      scope: 'read_orders,read_products',
      redirect_uri: `${origin}/auth/shopify/callback`,
      state: state
    }
  };
};
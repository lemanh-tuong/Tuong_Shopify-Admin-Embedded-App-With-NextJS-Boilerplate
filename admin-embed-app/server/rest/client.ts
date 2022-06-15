import Shopify from '@shopify/shopify-api';

interface CreateClient {
  shopDomain: string;
  accessToken: string;
}

export const createClient = ({ shopDomain, accessToken }: CreateClient) => {
  const client = new Shopify.Clients.Rest(shopDomain, accessToken);
  return client;
};

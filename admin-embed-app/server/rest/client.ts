import Shopify from '@shopify/shopify-api';

interface CreateClient {
  shopDomain: string;
  accessToken: string;
}

/**
 * @deprecated
 * Tại thời điểm comment này được viết ra, bằng một cách nào đấy làm theo docs của shopify như này sẽ k thể truyền các tham số
 */
export const createClient = ({ shopDomain, accessToken }: CreateClient) => {
  const client = new Shopify.Clients.Rest(shopDomain, accessToken);
  return client;
};

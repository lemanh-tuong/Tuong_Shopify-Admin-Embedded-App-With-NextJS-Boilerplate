import { gql, GraphQLClient } from 'graphql-request';

interface Response {
  shop: {
    email: string;
    myshopifyDomain: string;
  };
}

const GET_SHOP_PROPERTIES = gql`
  query {
    shop {
      myshopifyDomain
      email
    }
  }
`;

/** Định nghĩa khung graphql để lấy về các properties của shop qua shopify graphql */
export const getShopProperties = async ({ client }: { client: GraphQLClient }) => {
  const res = await client.request<Response>(GET_SHOP_PROPERTIES);
  return res;
};

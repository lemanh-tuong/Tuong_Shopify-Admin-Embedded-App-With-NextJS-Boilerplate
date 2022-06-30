import { ApolloClient, gql } from 'apollo-boost';
import 'isomorphic-fetch';

interface GetShopProperties {
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
export const getShopProperties = async ({ client }: { client: ApolloClient<any> }) => {
  const res = await client.query<GetShopProperties>({
    query: GET_SHOP_PROPERTIES,
  });
  return res;
};

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

export const getShopProperties = async ({ client }: { client: ApolloClient<any> }) => {
  const res = await client.query<GetShopProperties>({
    query: GET_SHOP_PROPERTIES,
  });
  return res;
};

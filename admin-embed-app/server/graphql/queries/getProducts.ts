import { ApolloClient, gql } from 'apollo-boost';
import 'isomorphic-fetch';

interface ProductsNode {
  cursor: string;
  node: {
    id: string;
    title: string;
  };
}

interface ProductsInterface {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: ProductsNode[];
  };
}
interface ProductsVars {
  query: string;
  quantity: number;
  cursor?: string;
}

const GET_PRODUCTS = gql`
  query getProducts($quantity: Int!, $cursor: String, $query: String) {
    products(first: $quantity, after: $cursor, query: $query) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
        }
      }
    }
  }
`;

export const getProducts = async ({ client, variables }: { client: ApolloClient<any>; variables: ProductsVars }) => {
  const res = await client.query<ProductsInterface>({
    query: GET_PRODUCTS,
    variables,
  });
  return res;
};

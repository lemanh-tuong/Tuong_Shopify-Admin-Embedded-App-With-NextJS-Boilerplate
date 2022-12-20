import { gql, GraphQLClient } from 'graphql-request';

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

/** File này chỉ là demo về cách viết graphql tại file server. Không liên quan gì đến chức năng trong app boilerplate */
export const getProducts = async ({ client, variables }: { client: GraphQLClient; variables: ProductsVars }) => {
  const res = await client.request<ProductsInterface>(GET_PRODUCTS, variables);
  return res;
};

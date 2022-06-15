import 'isomorphic-fetch';
import { ApolloClient, gql } from 'apollo-boost';

interface ProductSrcImageUpdateVariables {
  productId: string;
  image: {
    id: string;
    src: string;
  };
}

interface UserError {
  field: string;
  message: string;
}

interface ProductSrcImageResponse {
  productImageUpdate: {
    image: {
      id: string;
      originalSrc: string;
    };
    userErrors: UserError[];
  };
}

const PRODUCT_SRC_IMAGE_UPDATE = gql`
  mutation productImageUpdate($productId: ID!, $image: ImageInput!) {
    productImageUpdate(productId: $productId, image: $image) {
      image {
        id
        originalSrc
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const productSrcImageUpdate = async ({ client }: { client: ApolloClient<any>; variables: ProductSrcImageUpdateVariables }) => {
  const res = await client.mutate<ProductSrcImageResponse, ProductSrcImageUpdateVariables>({ mutation: PRODUCT_SRC_IMAGE_UPDATE });
  return res;
};

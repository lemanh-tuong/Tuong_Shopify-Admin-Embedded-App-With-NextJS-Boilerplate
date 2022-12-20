import { gql, GraphQLClient } from 'graphql-request';

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

/** File này chỉ là demo về cách viết graphql tại file server. Không liên quan gì đến chức năng trong app boilerplate */
export const productSrcImageUpdate = async ({ client, variables }: { client: GraphQLClient; variables: ProductSrcImageUpdateVariables }) => {
  const res = await client.request<ProductSrcImageResponse, ProductSrcImageUpdateVariables>(PRODUCT_SRC_IMAGE_UPDATE, variables);
  return res;
};

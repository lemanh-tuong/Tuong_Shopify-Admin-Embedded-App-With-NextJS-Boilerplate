import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';

export interface ShopInterface {
  shop: {
    myshopifyDomain: string;
    currencyFormats: {
      moneyFormat: string;
    };
  };
}

export const BULK = gql`
  mutation {
    bulkOperationRunQuery(
      query: """
      {
        products(query: "id:6955832344771") {
          edges {
            node {
              id
              createdAt
              updatedAt
              title
              handle
              descriptionHtml
              productType
              options {
                name
                position
                values
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      """
    ) {
      bulkOperation {
        id
        status
        completedAt
        objectCount
        rootObjectCount
        query
        partialDataUrl
        fileSize
        errorCode
        createdAt
        type
        url
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const useBulk = () => {
  const [postBulk, { data, loading, error }] = useMutation<ShopInterface, any>(BULK);
  return {
    data,
    loading,
    error,
    postBulk,
  };
};

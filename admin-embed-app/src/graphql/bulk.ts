import { useMutation, gql } from '@apollo/client';

interface BulkOperation {
  id: string;
  status: string;
  completedAt: any;
  objectCount: string;
  rootObjectCount: string;
  query: string;
  partialDataUrl: any;
  fileSize: any;
  errorCode: any;
  createdAt: string;
  type: string;
  url: any;
  __typename: string;
}

interface Result {
  bulkOperation: BulkOperation;
  userErrors: any[];
  __typename: string;
}

const BULK = gql`
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
  const [postBulk, { data, loading, error }] = useMutation<Result, undefined>(BULK);
  return {
    data,
    loading,
    error,
    postBulk,
  };
};

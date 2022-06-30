import 'isomorphic-fetch';
import { ApolloClient, gql } from 'apollo-boost';

interface StagedUploadsCreateVariables {
  input: [
    {
      resource: 'PRODUCT_IMAGE';
      filename: string;
      mimeType: string;
      fileSize: string;
      httpMethod: 'POST';
    },
  ];
}

interface StagedTargetsParameter {
  name: string;
  value: string;
}

interface StagedTarget {
  url: string;
  parameters: StagedTargetsParameter[];
}

interface StagedUploadsCreateResponse {
  stagedUploadsCreate: {
    stagedTargets: StagedTarget[];
  };
}

function STAGED_UPLOADS_CREATE({ input }: StagedUploadsCreateVariables) {
  return gql`
    mutation {
      stagedUploadsCreate(input: ${input}) {
        stagedTargets {
          resourceUrl
          url
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
}

/** File này chỉ là demo về cách viết graphql tại file server. Không liên quan gì đến chức năng trong app boilerplate */
export const stagedUploadsCreate = async ({ client, variables }: { client: ApolloClient<any>; variables: StagedUploadsCreateVariables }) => {
  const res = await client.mutate<StagedUploadsCreateResponse, StagedUploadsCreateVariables>({
    mutation: STAGED_UPLOADS_CREATE(variables),
  });
  return res;
};

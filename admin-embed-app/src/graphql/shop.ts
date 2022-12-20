import { useLazyQuery, gql } from '@apollo/client';

interface Result {
  shop: {
    myshopifyDomain: string;
    email: string;
  };
}

const GET_SHOP_NAME = gql`
  query getShopName {
    shop {
      myshopifyDomain
      email
    }
  }
`;

export const useGetShop = () => {
  const [getShop, { data, loading, error }] = useLazyQuery<Result, undefined>(GET_SHOP_NAME);
  return {
    data,
    loading,
    error,
    getShop,
  };
};

import { gql } from 'apollo-boost';
import { useLazyQuery } from 'react-apollo';

export interface ShopInterface {
  shop: {
    myshopifyDomain: string;
    email: string;
  };
}

export const GET_SHOP_NAME = gql`
  query getShopName {
    shop {
      myshopifyDomain
      email
    }
  }
`;

export const useGetShop = () => {
  const [getShop, { data, loading, error }] = useLazyQuery<ShopInterface, undefined>(GET_SHOP_NAME);
  return {
    data,
    loading,
    error,
    getShop,
  };
};

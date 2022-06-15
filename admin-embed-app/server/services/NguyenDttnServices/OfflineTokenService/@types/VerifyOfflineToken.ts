export interface VerifyOfflineToken_BEParametersExpect {
  shopName: string;
}

export interface VerifyOfflineToken_BEResponse {
  data: {
    isUpdatedOfflineToken: boolean;
  };
  message: 'Missing ShopName' | 'Offline Token has been updated' | 'Shop ID Not Found';
  status: 'success';
}

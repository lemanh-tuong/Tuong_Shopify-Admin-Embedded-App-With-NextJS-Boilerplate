import { OFFLINE_TOKEN_SERVICE } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { FakeGetSetDeleteDB } from 'server/services/utils';
import { fetchAPI } from '../fetchAPI';
import { VerifyOfflineToken_BEParametersExpect, VerifyOfflineToken_BEResponse, IOfflineTokenService } from './@types';

class OfflineTokenService implements IOfflineTokenService {
  url: string;
  constructor() {
    this.url = OFFLINE_TOKEN_SERVICE;
  }

  verifyOfflineToken: IOfflineTokenService['verifyOfflineToken'] = async ({ shopName }) => {
    const { url } = this;
    try {
      const response = await fetchAPI.request<VerifyOfflineToken_BEResponse>({
        url,
        method: 'GET',
        headers: { 'X-ShopName': shopName },
        params: { shopName } as VerifyOfflineToken_BEParametersExpect,
      });
      return response.data.data.isUpdatedOfflineToken;
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'verifyOfflineToken' });
      return false;
    }
  };
}

class FakeOfflineTokenService implements IOfflineTokenService {
  fakeDB: FakeGetSetDeleteDB<{ shopName: string; isVerified: boolean }, 'shopName'>;
  constructor() {
    this.fakeDB = new FakeGetSetDeleteDB('shopName');
  }
  verifyOfflineToken: IOfflineTokenService['verifyOfflineToken'] = async ({ shopName }) => {
    const isVerified = this.fakeDB.get(shopName);
    if (!isVerified) {
      this.fakeDB.set({ shopName, isVerified: Math.random() > 0.4 });
      return false;
    }
    return true;
  };
}

export const offlineTokenService = OFFLINE_TOKEN_SERVICE ? new OfflineTokenService() : new FakeOfflineTokenService();

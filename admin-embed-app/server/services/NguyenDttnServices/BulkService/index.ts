import { BULK_SERVICE_URL, BULK_TOKEN_FOR_SERVICE } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { fetchAPI } from '../fetchAPI';
import { IBulkService, PushBulk_BEExpectParams } from './@types';

class BulkService implements IBulkService {
  url: string;
  constructor() {
    this.url = BULK_SERVICE_URL;
  }
  pushBulk: IBulkService['pushBulk'] = async ({ shopName, body }) => {
    const { url } = this;
    try {
      await fetchAPI.request({
        url,
        method: 'POST',
        headers: {
          'X-ShopName': shopName,
          Authorization: BULK_TOKEN_FOR_SERVICE,
        },
        data: { shopName, body } as PushBulk_BEExpectParams,
      });
      return true;
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'pushBulk' });
      return false;
    }
  };
}

class FakeBulkService implements IBulkService {
  pushBulk: IBulkService['pushBulk'] = async () => {
    return true;
  };
}

export const bulkService = BULK_SERVICE_URL ? new BulkService() : new FakeBulkService();

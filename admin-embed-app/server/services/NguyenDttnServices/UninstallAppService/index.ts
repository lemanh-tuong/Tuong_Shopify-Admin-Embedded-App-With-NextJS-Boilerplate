import { UNINSTALLED_SERVICE_URL } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { fetchAPI } from '../fetchAPI';
import { IUninstallAppService, UninstallApp_BEExpectParameters, UninstallApp_BEResponse } from './@types';

class UninstallAppService implements IUninstallAppService {
  url: string;
  constructor() {
    this.url = UNINSTALLED_SERVICE_URL;
  }

  uninstallApp: IUninstallAppService['uninstallApp'] = async ({ shopName }) => {
    const { url } = this;
    try {
      await fetchAPI.request<UninstallApp_BEResponse>({
        url,
        method: 'POST',
        data: { shopName } as UninstallApp_BEExpectParameters,
        headers: { 'X-ShopName': shopName },
      });
      return true;
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'uninstallApp',
        additionalData: JSON.stringify({ shopName }),
      });
      return false;
    }
  };
}

class FakeUninstallAppService implements IUninstallAppService {
  uninstallApp: IUninstallAppService['uninstallApp'] = async () => {
    return true;
  };
}

export const uninstallAppService = UNINSTALLED_SERVICE_URL ? new UninstallAppService() : new FakeUninstallAppService();

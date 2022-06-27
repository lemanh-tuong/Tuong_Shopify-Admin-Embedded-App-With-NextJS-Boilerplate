import { reportService } from 'server/services/FirebaseSentryErrorService';
import { PRICING_SERVICE_URL } from 'server/env';
import { fetchAPI } from '../fetchAPI';
import { IPricingService, UpdatePricing_BEExpectParameters } from './@types';

class PricingService implements IPricingService {
  url: string;
  constructor() {
    this.url = PRICING_SERVICE_URL;
  }

  updatePricing: IPricingService['updatePricing'] = async ({ body, shopName }) => {
    try {
      await fetchAPI.request({
        method: 'PUT',
        url: this.url,
        data: { shopName, body } as UpdatePricing_BEExpectParameters,
        headers: { 'X-ShopName': shopName },
      });
      return true;
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'updatePricing',
        additionalData: JSON.stringify({ shopName, body }),
      });
      return false;
    }
  };
}

class FakePricingService implements IPricingService {
  updatePricing: IPricingService['updatePricing'] = async () => {
    return true;
  };
}

export const pricingService = PRICING_SERVICE_URL ? new PricingService() : new FakePricingService();

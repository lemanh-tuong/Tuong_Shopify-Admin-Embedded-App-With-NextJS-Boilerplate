import { UpdatePricing_BEExpectParameters } from './UpdatePricing';

export interface IPricingService {
  updatePricing: ({ body, shopName }: UpdatePricing_BEExpectParameters) => Promise<boolean>;
}

export * from './UpdatePricing';

import { watchGetCurrentPlan } from './watchGetCurrentPlan';
import { watchGetPlans } from './watchGetPlans';
import { watchGetPromoCode } from './watchGetPromoCode';

export const sagasPlans = [watchGetPlans, watchGetCurrentPlan, watchGetPromoCode];

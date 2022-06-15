import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { PlanAPIResponseData } from '../PlanAPI';

export const actionGetPlans = createAsyncAction(['@Plans/getPlansRequest', '@Plans/getPlansSuccess', '@Plans/getPlansFailure'])<
  undefined,
  { data: PlanAPIResponseData[] },
  undefined
>();

export const useGetPlans = createDispatchAsyncAction(actionGetPlans);

export const actionGetCurrentPlan = createAsyncAction([
  '@Plans/getCurrentPlanRequest',
  '@Plans/getCurrentPlanSuccess',
  '@Plans/getCurrentPlanFailure',
])<undefined, { currentPlan: PlanAPIResponseData['planName']; trialDays: string }, undefined>();

export const useGetCurrentPlan = createDispatchAsyncAction(actionGetCurrentPlan);

export const actionGetPromoCode = createAsyncAction(['@Plans/GetPromoCodeRequest', '@Plans/GetPromoCodeSuccess', '@Plans/GetPromoCodeFailure'])<
  { code: string },
  { coupon: string; couponID: string; percentage: string; messageCoupon: string },
  undefined
>();

export const useGetPromoCode = createDispatchAsyncAction(actionGetPromoCode);

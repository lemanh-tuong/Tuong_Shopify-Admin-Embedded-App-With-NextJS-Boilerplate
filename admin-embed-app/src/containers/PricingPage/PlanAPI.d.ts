export interface PlanAPIResponse {
  data: PlanAPIResponseData[];
  message: string;
  status: string;
}

export interface PlanAPIResponseData {
  planName: 'Free' | 'Pro';
  planSlug: string;
  extraInfo: {
    price: string;
    toggleCheckout: string;
    toggleDetectAuto: boolean;
  };
  description: string;
  canUpgrade: boolean;
}

export interface CurrentPlanAPIResponse {
  data: {
    canUpgrade: true;
    description: '';
    extraInfo: { price: '0'; toggleDetectAuto: false; toggleCheckout: false };
    planName: PlanAPIResponseData['planName'];
    planSlug: 'free';
    trialDays: string;
  };
  message: string;
  status: string;
}

export interface ChargeUrlAPIResponse {
  data: {
    redirectTo: string;
  };
  message: string;
  status: string;
}

export interface CouponAPIResponse {
  data: {
    coupon: string;
    percentage: string;
    couponID: string;
  };
  message: string;
  status: string;
}

import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetCurrentPlan, actionGetPlans, actionGetPromoCode } from '../actions/actionPlans';
import { PlanAPIResponseData } from '../PlanAPI';

type Actions = ActionTypes<typeof actionGetPlans | typeof actionGetCurrentPlan | typeof actionGetPromoCode>;

interface State {
  requestStatus: Status;
  plans: PlanAPIResponseData[];
  message: string;
  requestCurrentPlan: Status;
  currentPlan: PlanAPIResponseData['planName'];
  trialDays: string;
  getCodeRequest: Status;
  planCode: {
    coupon: string;
    couponID: string;
    percentage: string;
    messageCoupon: string;
  };
}

const defaultState: State = {
  message: '',
  plans: [],
  requestStatus: 'idle',
  requestCurrentPlan: 'idle',
  currentPlan: 'Free',
  trialDays: '',
  getCodeRequest: 'idle',
  planCode: {
    coupon: '',
    couponID: '',
    percentage: '',
    messageCoupon: '',
  },
};

export const reducerPlans = createReducer<State, Actions>(defaultState, [
  handleAction('@Plans/getPlansRequest', ({ state }) => {
    return {
      ...state,
      requestStatus: 'loading',
    };
  }),
  handleAction('@Plans/getPlansSuccess', ({ state, action }) => {
    return {
      ...state,
      requestStatus: 'success',
      plans: action.payload.data,
    };
  }),
  handleAction('@Plans/getPlansFailure', ({ state }) => {
    return {
      ...state,
      requestStatus: 'failure',
    };
  }),
  handleAction('@Plans/getCurrentPlanRequest', ({ state }) => {
    return {
      ...state,
      requestCurrentPlan: 'loading',
    };
  }),
  handleAction('@Plans/getCurrentPlanSuccess', ({ state, action }) => {
    return {
      ...state,
      requestCurrentPlan: 'success',
      currentPlan: action.payload.currentPlan,
      trialDays: action.payload.trialDays,
    };
  }),
  handleAction('@Plans/getCurrentPlanFailure', ({ state }) => {
    return {
      ...state,
      requestCurrentPlan: 'failure',
    };
  }),
  handleAction('@Plans/GetPromoCodeRequest', ({ state }) => {
    return {
      ...state,
      getCodeRequest: 'loading',
    };
  }),
  handleAction('@Plans/GetPromoCodeSuccess', ({ state, action }) => {
    const { coupon, couponID, messageCoupon, percentage } = action.payload;
    return {
      ...state,
      getCodeRequest: 'success',
      planCode: {
        ...state.planCode,
        coupon,
        couponID,
        messageCoupon,
        percentage,
      },
    };
  }),
  handleAction('@Plans/GetPromoCodeFailure', ({ state }) => {
    return {
      ...state,
      getCodeRequest: 'failure',
    };
  }),
]);

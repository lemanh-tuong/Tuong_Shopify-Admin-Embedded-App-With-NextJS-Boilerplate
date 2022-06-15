import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getAppRecommendations } from '../actions/actionAppRecommendations';
import { NguyenDttnGetAppRecommendationsResponseItem } from '../type';

interface State {
  statusRequest: Status;
  data: NguyenDttnGetAppRecommendationsResponseItem[];
}

type Actions = ActionTypes<typeof getAppRecommendations>;

const defaultState: State = {
  data: [],
  statusRequest: 'idle',
};

export const reducerAppRecommendations = createReducer<State, Actions>(defaultState, [
  handleAction('@AppRecommendations/getRequest', ({ state }) => {
    return {
      ...state,
      statusRequest: 'loading',
    };
  }),
  handleAction('@AppRecommendations/getSuccess', ({ state, action }) => {
    const { app_recommendations } = action.payload;
    return {
      ...state,
      statusRequest: 'success',
      data: app_recommendations,
    };
  }),
  handleAction('@AppRecommendations/getFailure', ({ state }) => {
    return {
      ...state,
      statusRequest: 'failure',
    };
  }),
]);

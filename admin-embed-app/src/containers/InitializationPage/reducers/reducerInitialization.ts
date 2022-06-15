import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { initialization } from '../actions/actionInitializationPage';

interface State {
  statusInitialization: Status;
  app?: App;
  shopDomain?: string;
  email?: string;
  themeId: number | undefined | null;
  appExtensionActived?: boolean;
}

type Actions = ActionTypes<typeof initialization>;

const defaultState: State = {
  statusInitialization: 'idle',
  app: undefined,
  shopDomain: undefined,
  email: undefined,
  themeId: undefined,
  appExtensionActived: undefined,
};

export const reducerInitialization = createReducer<State, Actions>(defaultState, [
  handleAction('@InitializationPage/initializationRequest', ({ state, action }) => {
    const { app } = action.payload;
    return {
      ...state,
      statusInitialization: 'loading',
      app,
    };
  }),
  handleAction('@InitializationPage/initializationSucess', ({ state, action }) => {
    const { themeId, appExtensionActived, email, myshopifyDomain } = action.payload;
    return {
      ...state,
      statusInitialization: 'success',
      shopDomain: myshopifyDomain,
      email,
      appExtensionActived,
      themeId,
    };
  }),
  handleAction('@InitializationPage/initializationFailure', ({ state }) => {
    return {
      ...state,
      statusInitialization: 'failure',
    };
  }),
]);

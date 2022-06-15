import { InitializationApp } from 'general/MyApi';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const initialization = createAsyncAction([
  '@InitializationPage/initializationRequest',
  '@InitializationPage/initializationSucess',
  '@InitializationPage/initializationFailure',
])<{ app: App }, InitializationApp, undefined>();

export const useInitialization = createDispatchAsyncAction(initialization);

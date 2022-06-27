import { InitializationApp_Response } from 'general/@types/BE/InitializationApp';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const initialization = createAsyncAction([
  '@InitializationPage/initializationRequest',
  '@InitializationPage/initializationSucess',
  '@InitializationPage/initializationFailure',
])<{ app: App }, InitializationApp_Response, undefined>();

export const useInitialization = createDispatchAsyncAction(initialization);

import { InitializationApp_ResponseSuccess } from 'general/@types/BE/InitializationApp';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const initialization = createAsyncAction([
  '@InitializationPage/initializationRequest',
  '@InitializationPage/initializationSucess',
  '@InitializationPage/initializationFailure',
])<{ app: App }, InitializationApp_ResponseSuccess, { isInvalidToken: boolean }>();

export const useInitialization = createDispatchAsyncAction(initialization);

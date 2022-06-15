import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { Settings } from '../postmessage';

interface ChangeSetting {
  data: Partial<Settings>;
}
export const changeSetting = createAction('@Setting/changeSetting', (payload: ChangeSetting) => ({
  ...payload,
}));

export const getDefaultSetting = createAsyncAction([
  '@Setting/getDefaultSettingRequest',
  '@Setting/getDefaultSettingSuccess',
  '@Setting/getDefaultSettingFailure',
])<undefined, { settings: Settings }, undefined>();

export const saveSetting = createAsyncAction(['@Setting/saveSettingRequest', '@Setting/saveSettingSuccess', '@Setting/saveSettingFailure'])<
  { onFailure: (message: string) => void },
  undefined,
  undefined
>();

export const changeModalSaveCompleteVisible = createAction('@Setting/changeModalSaveCompleteVisible', (payload: boolean) => payload);
export const changeModalRatingVisible = createAction('@Setting/changeModalRatingVisible', (payload: boolean) => payload);

export const useGetDefaultSetting = createDispatchAsyncAction(getDefaultSetting);
export const useSaveSetting = createDispatchAsyncAction(saveSetting);
export const useChangeSetting = createDispatchAction(changeSetting);
export const useChangeModalSaveCompleteVisible = createDispatchAction(changeModalSaveCompleteVisible);
export const useChangeModalRatingVisible = createDispatchAction(changeModalRatingVisible);

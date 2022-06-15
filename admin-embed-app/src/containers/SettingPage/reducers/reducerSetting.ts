import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { changeModalRatingVisible, changeModalSaveCompleteVisible, changeSetting, getDefaultSetting, saveSetting } from '../actions/actionSetting';
import { Settings } from '../postmessage';

interface State {
  statusRequest: Status;
  statusSave: Status;
  isDraft: boolean;
  settings: Settings;
  originalSettings: Settings;
  modalSaveCompleteVisible: boolean;
  modalRatingVisible: boolean;
}

type Actions = ActionTypes<
  typeof getDefaultSetting | typeof saveSetting | typeof changeSetting | typeof changeModalSaveCompleteVisible | typeof changeModalRatingVisible
>;

export const defaultState: State = {
  statusRequest: 'idle',
  statusSave: 'idle',
  isDraft: false,
  settings: {},
  originalSettings: {},
  modalSaveCompleteVisible: false,
  modalRatingVisible: false,
};

export const reducerSetting = createReducer<State, Actions>(defaultState, [
  handleAction('@Setting/getDefaultSettingRequest', ({ state }) => {
    return { ...state, statusRequest: 'loading' };
  }),
  handleAction('@Setting/getDefaultSettingSuccess', ({ state, action }) => {
    const { settings } = action.payload;
    return {
      ...state,
      statusRequest: 'success',
      settings,
      originalSettings: settings,
    };
  }),
  handleAction('@Setting/getDefaultSettingFailure', ({ state }) => {
    return { ...state, statusRequest: 'failure' };
  }),
  handleAction('@Setting/saveSettingRequest', ({ state }) => {
    return { ...state, statusSave: 'loading' };
  }),
  handleAction('@Setting/saveSettingSuccess', ({ state }) => {
    const { settings } = state;
    return {
      ...state,
      originalSettings: settings,
      statusSave: 'success',
      isDraft: false,
    };
  }),
  handleAction('@Setting/saveSettingFailure', ({ state }) => {
    return { ...state, statusSave: 'failure' };
  }),
  handleAction('@Setting/changeSetting', ({ state, action }) => {
    const { data } = action.payload;
    return {
      ...state,
      settings: { ...state.settings, ...data },
    };
  }),
  handleAction('@Setting/changeModalSaveCompleteVisible', ({ state, action }) => {
    return {
      ...state,
      modalSaveCompleteVisible: action.payload,
    };
  }),
  handleAction('@Setting/changeModalRatingVisible', ({ state, action }) => {
    return {
      ...state,
      modalRatingVisible: action.payload,
    };
  }),
]);

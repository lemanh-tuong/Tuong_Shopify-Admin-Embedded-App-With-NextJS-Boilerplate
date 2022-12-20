import { initializationSelector, settingSelector } from 'src/store/selectors';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { changeModalRatingVisible, changeModalSaveCompleteVisible, saveSetting } from '../actions/actionSetting';

function* handleSaveSetting({ payload }: ReturnType<typeof saveSetting.request>) {
  try {
    const { app, appExtensionActived }: ReturnType<typeof initializationSelector> = yield select(initializationSelector);
    const { settings }: ReturnType<typeof settingSelector> = yield select(settingSelector);
    console.log('Save', settings);
    if (!app) {
      throw new Error("App didn't exist");
    }

    yield put(changeModalSaveCompleteVisible(!appExtensionActived ? true : false));
    yield put(changeModalRatingVisible(appExtensionActived ? true : false));
    yield put(saveSetting.success(undefined));
  } catch (err) {
    const _err = err as AxiosError;
    if (_err.response) {
      payload.onFailure(_err.response.data.message);
    } else {
      notification.error({ message: 'Something went wrong' });
    }
    yield put(saveSetting.failure(undefined));
  }
}

export function* watchSaveSetting() {
  yield takeLatest(getActionType(saveSetting.request), handleSaveSetting);
}

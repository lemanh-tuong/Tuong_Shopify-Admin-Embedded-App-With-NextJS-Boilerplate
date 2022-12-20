import { notification } from 'antd';
import { put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { getDefaultSetting } from '../actions/actionSetting';

function* handleGetDefaultSetting() {
  try {
    yield put(getDefaultSetting.success({ settings: {} }));
  } catch (err) {
    const _err = err as Error;
    notification.error({ message: 'Get Default Fail', description: _err.message });
    yield put(getDefaultSetting.failure(undefined));
  }
}

export function* watchGetDefaultSetting() {
  yield takeLatest(getActionType(getDefaultSetting.request), handleGetDefaultSetting);
}

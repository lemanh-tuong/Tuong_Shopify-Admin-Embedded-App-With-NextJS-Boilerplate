import { InitializationApp_Response } from 'general/@types/BE/InitializationApp';
import { fetchAPI } from 'src/utils';
import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { getActionType } from 'wiloke-react-core/utils';
import { initialization } from '../actions/actionInitializationPage';

function* handleInitialization({ payload }: ReturnType<typeof initialization.request>) {
  try {
    const res: AxiosResponse<InitializationApp_Response> = yield retry(3, 1000, fetchAPI.request, {
      url: `${payload.app.localOrigin}/api/initialization`,
      baseURL: '',
    });

    yield put(
      initialization.success({
        themeId: res.data.themeId,
        appExtensionActived: res.data.appExtensionActived,
        email: res.data.email,
        myshopifyDomain: res.data.myshopifyDomain,
      }),
    );
  } catch (error) {
    console.log(error);
    yield put(initialization.failure(undefined));
  }
}

export function* watchInitialization() {
  yield takeLatest(getActionType(initialization.request), handleInitialization);
}

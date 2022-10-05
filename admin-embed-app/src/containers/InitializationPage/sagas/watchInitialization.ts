import { InitializationApp_ResponseSuccess, InitializationApp_ResponseError } from 'general/@types/BE/InitializationApp';
import { fetchAPI } from 'src/utils';
import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { getActionType } from 'wiloke-react-core/utils';
import { initialization } from '../actions/actionInitializationPage';

function* handleInitialization({ payload }: ReturnType<typeof initialization.request>) {
  try {
    const res: AxiosResponse<InitializationApp_ResponseSuccess> = yield retry(3, 1000, fetchAPI.request, {
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
    const error_ = error as AxiosError;
    if (error_.isAxiosError) {
      const isInvalidToken = (error_.response?.data as InitializationApp_ResponseError).isInvalidToken;
      yield put(initialization.failure({ isInvalidToken }));
    } else {
      yield put(initialization.failure({ isInvalidToken: false }));
    }
  }
}

export function* watchInitialization() {
  yield takeLatest(getActionType(initialization.request), handleInitialization);
}

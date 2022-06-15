import { APP_NAME, APP_RECOMMENDATIONS_URL } from 'src/env';
import { fetchAPI } from 'src/utils';
import { AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { getAppRecommendations } from '../actions/actionAppRecommendations';
import { NguyenDttnGetAppRecommendationsResponseSuccess } from '../type';

function* handleGetAppRecommendations() {
  try {
    const res: AxiosResponse<NguyenDttnGetAppRecommendationsResponseSuccess> = yield retry(3, 500, fetchAPI.request, {
      url: APP_RECOMMENDATIONS_URL,
      baseURL: '',
      params: {
        app: APP_NAME.toLowerCase().replaceAll(' ', '-'),
      },
    });
    yield put(getAppRecommendations.success({ app_recommendations: res.data.data }));
  } catch (err) {
    yield put(getAppRecommendations.failure(undefined));
  }
}

export function* watchGetAppRecommendations() {
  yield takeLatest(getActionType(getAppRecommendations.request), handleGetAppRecommendations);
}

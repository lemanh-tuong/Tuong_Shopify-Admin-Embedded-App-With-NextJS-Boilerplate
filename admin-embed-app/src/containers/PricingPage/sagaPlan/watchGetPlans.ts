import { API_ALL_PLAN } from 'src/env';
import { fetchAPI } from 'src/utils';
import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPlans } from '../actions/actionPlans';
import { PlanAPIResponse } from '../PlanAPI';

function* handleGet() {
  try {
    const response: AxiosResponse<PlanAPIResponse> = yield retry(3, 500, fetchAPI.request, {
      baseURL: API_ALL_PLAN,
    });

    const _dataSuccess = response.data.data;

    yield put(actionGetPlans.success({ data: _dataSuccess }));
  } catch (error) {
    console.log(error);
    yield put(actionGetPlans.failure(undefined));
  }
}

export function* watchGetPlans() {
  yield takeLatest(getActionType(actionGetPlans.request), handleGet);
}

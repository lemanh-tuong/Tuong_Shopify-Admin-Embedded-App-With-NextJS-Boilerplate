import { API_CURRENT_PLAN } from 'src/env';
import { fetchAPI } from 'src/utils';
import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetCurrentPlan } from '../actions/actionPlans';
import { CurrentPlanAPIResponse } from '../PlanAPI';

function* handleGet() {
  try {
    const response: AxiosResponse<CurrentPlanAPIResponse> = yield retry(3, 500, fetchAPI.request, {
      baseURL: API_CURRENT_PLAN,
    });
    const _dataSuccess = response.data.data.planName;
    yield put(actionGetCurrentPlan.success({ currentPlan: _dataSuccess, trialDays: response.data.data.trialDays }));
  } catch (error) {
    notification.error({ message: 'Error!', description: 'Something went wrong' });
    yield put(actionGetCurrentPlan.failure(undefined));
  }
}

export function* watchGetCurrentPlan() {
  yield takeLatest(getActionType(actionGetCurrentPlan.request), handleGet);
}

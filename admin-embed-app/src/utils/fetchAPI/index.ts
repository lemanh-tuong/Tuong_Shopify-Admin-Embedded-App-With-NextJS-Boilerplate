import { MAIN_SERVICE_ENDPOINT } from 'src/env';
import qs from 'qs';
import { CANCEL } from 'redux-saga';
import { ConfigureAxios } from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: MAIN_SERVICE_ENDPOINT,
    timeout: 30000,
    paramsSerializer: qs.stringify,
  },
});

export const fetchAPI = axiosConfig.create(CANCEL);

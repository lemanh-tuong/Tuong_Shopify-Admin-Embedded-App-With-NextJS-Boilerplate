import { AXIOS_BASE_URL } from 'src/env';
import qs from 'qs';
import { CANCEL } from 'redux-saga';
import { ConfigureAxios } from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: AXIOS_BASE_URL,
    timeout: 30000,
    paramsSerializer: qs.stringify,
  },
});

export const fetchAPI = axiosConfig.create(CANCEL);

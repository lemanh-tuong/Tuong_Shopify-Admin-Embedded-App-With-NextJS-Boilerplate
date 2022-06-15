import { SECRET_KEY_OF_SERVICE } from 'server/env';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import QueryString from 'qs';

type ConfigWithXShopnameInHeaders = Omit<AxiosRequestConfig, 'headers'> & {
  headers: { 'X-ShopName'?: string; Authorization?: string };
} & Record<string, any>;

type RequestFunc = <T = any, R = AxiosResponse<T>>(config: ConfigWithXShopnameInHeaders) => Promise<R>;

interface FetchAPI {
  request: RequestFunc;
}

const axiosInstance = axios.create({
  paramsSerializer: QueryString.stringify,
});

axiosInstance.interceptors.request.use(config => {
  const _config = config as ConfigWithXShopnameInHeaders;
  const shopName = _config.headers['X-ShopName'];
  const authorization = _config.headers.Authorization;
  if (shopName !== undefined && authorization === undefined) {
    const token = jwt.sign({ shopName }, SECRET_KEY_OF_SERVICE, {
      algorithm: 'HS256',
      expiresIn: '10h',
    });
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchAPI: FetchAPI = {
  request: config => axiosInstance.request(config),
};

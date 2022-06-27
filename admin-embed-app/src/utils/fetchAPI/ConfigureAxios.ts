import { getSessionToken } from '@shopify/app-bridge-utils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface Configure {
  configure: AxiosRequestConfig;
}

const { CancelToken } = axios;

export class ConfigureAxios {
  private axiosInstance: AxiosInstance;

  public constructor({ configure }: Configure) {
    this.axiosInstance = axios.create(configure);
    this.axiosInstance.interceptors.request.use(async config => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const state = require('src/store/configureStore').store.getState() as AppState;
      const app = state.initialization.app;
      const shopDomain = state.initialization.shopDomain;
      if (!app) {
        throw new Error('App chưa đc khởi tạo');
      }
      const sessionToken = await getSessionToken(app);
      config.headers.Authorization = `Bearer ${sessionToken}`;

      if (!config.url?.includes('app-recommendations')) {
        config.headers['X-ShopName'] = shopDomain;
      }
      return config;
    });
  }

  public create = (cancel = '') => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const request = this.axiosInstance({ ...requestConfig, cancelToken: source.token });
        if (!!cancel) {
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };
}

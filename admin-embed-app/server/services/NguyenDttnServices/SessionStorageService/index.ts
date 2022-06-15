import { SESSION_STORAGE_SERVICE_URL } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { FakeGetSetDeleteDB } from 'server/services/utils';
import { fetchAPI } from '../fetchAPI';
import {
  DeleteSessionStorage_BEExpectParameters,
  DeleteSessionStorage_Response,
  GetSessionStorage_BEExpectParameters,
  GetSessionStorage_Response,
  ISessionStorageService,
  SetSessionStorage_BEExpectParameters,
  SetSessionStorage_Response,
} from './@types';

class SessionStorageService implements ISessionStorageService {
  url: string;
  constructor() {
    this.url = SESSION_STORAGE_SERVICE_URL;
  }

  public getSessionStorage: ISessionStorageService['getSessionStorage'] = async ({ key }) => {
    const { url } = this;
    try {
      const response = await fetchAPI.request<GetSessionStorage_Response>({
        url,
        params: { key } as GetSessionStorage_BEExpectParameters,
        headers: {},
      });
      return response.data.data;
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'getSessionStorage' });
      return undefined;
    }
  };

  public setSessionStorage: ISessionStorageService['setSessionStorage'] = async ({ key, values }) => {
    const { url } = this;
    try {
      await fetchAPI.request<SetSessionStorage_Response>({
        url,
        method: 'post',
        data: { key, values } as SetSessionStorage_BEExpectParameters,
        headers: {},
      });
      return true;
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'setSessionStorage' });
      return false;
    }
  };

  public deleteSessionStorage: ISessionStorageService['deleteSessionStorage'] = async ({ key }) => {
    const { url } = this;
    try {
      await fetchAPI.request<DeleteSessionStorage_Response>({
        url,
        method: 'DELETE',
        params: { key } as DeleteSessionStorage_BEExpectParameters,
        headers: {},
      });
      return true;
    } catch (err) {
      reportService.createReportError({ error: err as Error, positionError: 'deleteSessionStorage' });
      return false;
    }
  };
}

class FakeSessionStorageService implements ISessionStorageService {
  fakeDB: FakeGetSetDeleteDB<{ key: string; values: Record<string, any> }, 'key'>;
  constructor() {
    this.fakeDB = new FakeGetSetDeleteDB('key');
  }
  getSessionStorage: ISessionStorageService['getSessionStorage'] = async ({ key }) => {
    return this.fakeDB.get(key)?.values;
  };
  setSessionStorage: ISessionStorageService['setSessionStorage'] = async ({ key, values }) => {
    return this.fakeDB.set({ key, values: JSON.parse(values) });
  };
  deleteSessionStorage: ISessionStorageService['deleteSessionStorage'] = async ({ key }) => {
    return this.fakeDB.delete(key);
  };
}

export const sessionStorageService = SESSION_STORAGE_SERVICE_URL ? new SessionStorageService() : new FakeSessionStorageService();

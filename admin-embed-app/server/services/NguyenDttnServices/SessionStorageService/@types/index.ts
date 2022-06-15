import { DeleteSessionStorage_BEExpectParameters } from './DeleteSesstionStorage';
import { GetSessionStorage_BEExpectParameters } from './GetSessionStorage';
import { SetSessionStorage_BEExpectParameters } from './SetSessionStorage';

export interface ISessionStorageService {
  getSessionStorage: ({ key }: GetSessionStorage_BEExpectParameters) => Promise<Record<string, any> | undefined>;
  setSessionStorage: ({ key, values }: SetSessionStorage_BEExpectParameters) => Promise<boolean>;
  deleteSessionStorage: ({ key }: DeleteSessionStorage_BEExpectParameters) => Promise<boolean>;
}

export * from './DeleteSesstionStorage';
export * from './GetSessionStorage';
export * from './SetSessionStorage';

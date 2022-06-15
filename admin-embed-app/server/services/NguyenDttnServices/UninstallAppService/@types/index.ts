import { UninstallApp_BEExpectParameters } from './UninstallApp';

export interface IUninstallAppService {
  uninstallApp: ({ shopName }: UninstallApp_BEExpectParameters) => Promise<boolean>;
}

export * from './UninstallApp';

import { VerifyOfflineToken_BEParametersExpect } from './VerifyOfflineToken';

export interface IOfflineTokenService {
  verifyOfflineToken: ({ shopName }: VerifyOfflineToken_BEParametersExpect) => Promise<boolean>;
}

export * from './VerifyOfflineToken';

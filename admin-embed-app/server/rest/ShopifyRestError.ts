import { AxiosError } from 'axios';

export class ShopifyRestError extends Error {
  isAuthenticationError: boolean;

  constructor(error: Error | AxiosError) {
    const error_ = error as AxiosError;
    super();
    this.message = error_.isAxiosError ? error_.message : error.message;
    this.isAuthenticationError = !!error_.isAxiosError && !!error_.code && ['401', '403'].includes(error_.code);
  }
}

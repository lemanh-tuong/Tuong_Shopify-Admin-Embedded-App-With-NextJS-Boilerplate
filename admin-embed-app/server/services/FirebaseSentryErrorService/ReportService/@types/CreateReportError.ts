import { AxiosError } from 'axios';

export interface CreateReportError_BEExpectParams {
  error: Error | AxiosError;
  positionError: string;
  additionalData?: string;
}

export interface CreateReportError_BEResponse {}

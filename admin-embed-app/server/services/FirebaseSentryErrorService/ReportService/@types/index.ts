import { CreateReportError_BEExpectParams } from './CreateReportError';

export interface IReportService {
  createReportError: ({ error, positionError, additionalData }: CreateReportError_BEExpectParams) => Promise<boolean>;
}

export * from './CreateReportError';

import { PushBulk_BEExpectParams } from './PushBulk';

export interface IBulkService {
  pushBulk: ({ shopName, body }: PushBulk_BEExpectParams) => Promise<boolean>;
}

export * from './PushBulk';

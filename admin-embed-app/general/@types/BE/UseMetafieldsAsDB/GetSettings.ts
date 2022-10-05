import { Settings } from 'general/@types/FE/Settings';

interface ExistSetting {
  settings: Settings;
  metafieldId: number;
}

export interface GetSettings_ResponseSuccess {
  /**
   * Lấy về settings thông qua api metafield shopify
   * Nếu có settings thì chắc chắn se có metafieldId. Nếu không thì chứng tỏ "settings" không tồn tại (undefined)
   */
  data: ExistSetting | undefined;
}

export interface GetSettings_ResponseError {
  message: string;
  isInvalidToken: boolean;
}

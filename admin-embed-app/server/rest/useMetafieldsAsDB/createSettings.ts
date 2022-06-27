import { API_VERSION, APP_NAME } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { Settings } from 'general/@types/FE/Settings';
import axios from 'axios';

export interface CreateSettings {
  myshopifyDomain: string;
  accessToken: string;
  settings: Settings;
}

interface ShopifyMetaField {
  created_at: string;
  description: string;
  id: number;
  key: 'settings';
  namespace: typeof APP_NAME;
  owner_id: number;
  owner_resource: string;
  updated_at: string;
  value: ReturnType<typeof JSON.stringify>;
  type: 'json';
  value_type: string;
}

interface ShopifyCreateMetaField_ExpectBodyData {
  metafield: {
    namespace: typeof APP_NAME;
    key: 'settings';
    value: any;
    type: 'json';
  };
}

interface ShopifyCreateMetaFieldResponse {
  metafield: ShopifyMetaField;
}

/**
 * @tuong -> Lưu ý khi metafield với "namespace" và "key" đã tồn tại shopify vẫn trả vê kết quả của metafield đó
 */
export const createSettings = async ({ accessToken, myshopifyDomain, settings }: CreateSettings) => {
  try {
    const settings_data = await axios.request<ShopifyCreateMetaFieldResponse>({
      url: `https://${myshopifyDomain}/admin/api/${API_VERSION}/metafields.json`,
      method: 'post',
      data: {
        metafield: {
          // NOTE: namespace, key, type có ảnh hưởng đến api getSettings và updateSettings -> Nếu có thay đổi tên cần thay đổi cả ở những function khác có liên quan
          namespace: APP_NAME,
          key: 'settings',
          value: JSON.stringify(settings),
          type: 'json',
        },
      } as ShopifyCreateMetaField_ExpectBodyData,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });
    return settings_data.data.metafield;
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'createSettings',
      additionalData: JSON.stringify({ myshopifyDomain, accessToken, settings }),
    });
    throw err;
  }
};

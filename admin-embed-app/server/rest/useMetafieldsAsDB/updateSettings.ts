import { API_VERSION, APP_NAME } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { Settings } from 'general/@types/FE/Settings';
import axios from 'axios';

export interface UpdateSettings {
  metafieldId: number;
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

interface ShopifyUpdateMetaField_ExpectBodyData {
  metafield: {
    id: number;
    value: Settings;
    type: 'json';
  };
}

interface ShopifyUpdateMetaFieldResponse {
  metafield: ShopifyMetaField;
}

export const updateSettings = async ({ accessToken, metafieldId, myshopifyDomain, settings }: UpdateSettings) => {
  try {
    const settings_data = await axios.request<ShopifyUpdateMetaFieldResponse>({
      url: `https://${myshopifyDomain}/admin/api/${API_VERSION}/metafields/${metafieldId}.json`,
      method: 'put',
      data: JSON.stringify({
        metafield: {
          id: metafieldId,
          value: JSON.stringify(settings),
          type: 'json',
        },
      } as ShopifyUpdateMetaField_ExpectBodyData),
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

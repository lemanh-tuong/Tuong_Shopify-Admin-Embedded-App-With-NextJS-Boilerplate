import { API_VERSION, APP_NAME } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import axios from 'axios';

export interface GetSettings {
  myshopifyDomain: string;
  accessToken: string;
}

interface ShopifyMetaField {
  created_at: string;
  description: string;
  id: number;
  key: string | 'settings';
  namespace: string | typeof APP_NAME;
  owner_id: number;
  owner_resource: string;
  updated_at: string;
  value: ReturnType<typeof JSON.stringify>;
  type: string;
  value_type: string;
}

interface ShopifyGetMetaFields {
  metafields: ShopifyMetaField[] | null;
}

export const getSettings = async ({ accessToken, myshopifyDomain }: GetSettings) => {
  try {
    const res = await axios.request<ShopifyGetMetaFields>({
      url: `https://${myshopifyDomain}/admin/api/${API_VERSION}/metafields.json`,
      params: {
        namespace: APP_NAME,
        key: 'settings',
        type: 'json',
      },
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });
    return res.data.metafields?.find(metafield => metafield.namespace === APP_NAME && metafield.key === 'settings');
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'getSettings',
      additionalData: JSON.stringify({ accessToken, myshopifyDomain }),
    });
    throw err;
  }
};

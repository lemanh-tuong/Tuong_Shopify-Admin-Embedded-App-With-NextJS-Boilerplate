import { API_VERSION, APP_EMBED_EXTENSION_UUID } from 'server/env';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import axios from 'axios';

interface GetSettingsData {
  asset: {
    checksum: string;
    content_type: string;
    created_at: string;
    key: 'config/settings_data.json';
    public_url: null;
    size: number;
    theme_id: number;
    updated_at: string;
    value: string;
    warnings: [];
  };
}
interface Block {
  type: string;
  disabled: boolean;
  settings: Record<string, any>;
}
type Blocks = undefined | null | Record<string, Block>;

interface GetAppExtensionStatusActive {
  myshopifyDomain: string;
  accessToken: string;
  themeId: number | undefined;
}

export const getAppExtensionStatusActive = async ({ myshopifyDomain, accessToken, themeId }: GetAppExtensionStatusActive): Promise<boolean> => {
  if (themeId === undefined) {
    return false;
  }
  try {
    const settings_data = await axios.request<GetSettingsData>({
      url: `https://${myshopifyDomain}/admin/api/${API_VERSION}/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });

    const json_parse = JSON.parse(settings_data.data.asset.value);
    const blocks = json_parse.current.blocks as Blocks;
    if (typeof blocks === 'object' && blocks !== null) {
      const disabled = Object.values(blocks).find(block => {
        return block.type.includes(APP_EMBED_EXTENSION_UUID);
      })?.disabled;
      return typeof disabled === 'boolean' ? !disabled : false;
    }
    return false;
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'getAppExtensionStatusActive',
      additionalData: JSON.stringify({ myshopifyDomain, accessToken }),
    });
    throw err;
  }
};

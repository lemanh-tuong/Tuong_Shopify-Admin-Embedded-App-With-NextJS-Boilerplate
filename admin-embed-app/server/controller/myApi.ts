import { InitializationApp } from 'general/MyApi';
import { CODE_ERROR } from 'server/const';
import { API_VERSION } from 'server/env';
import { createClient, getShopProperties } from 'server/graphql';
import { getActiveTheme, getAppExtensionStatusActive } from 'server/rest';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { getSession } from 'server/utils';
import { IMiddleware } from 'koa-router';

/** api để lấy về những thứ cần dùng tại client
 * @property themeId: dùng để link tới builder của shopify -> dùng cho chức năng active theme app extension.
 * @property appExtensionActived: dùng để check trạng thái active của theme app extension -> để hiện lên thông báo là app chưa được bật
 * @link Chi tiết xem tại:  https://wilokesoftware.atlassian.net/wiki/spaces/SP/pages/396820492/Admin+embed
 */
export const initializationApp: IMiddleware = async ctx => {
  try {
    const session = await getSession({ ctx });
    const isActive = new Date(session?.expires ?? 0).getTime() - Date.now() > 0;
    if (session && isActive && session.accessToken) {
      const shopDomain = session.shop;
      const accessToken = session.accessToken;
      const client = createClient({ shopDomain, accessToken, apiVersion: API_VERSION });
      const { data } = await getShopProperties({ client });
      const activeTheme = await getActiveTheme({ accessToken, myshopifyDomain: data.shop.myshopifyDomain });
      const actvied = await getAppExtensionStatusActive({ myshopifyDomain: data.shop.myshopifyDomain, accessToken, themeId: activeTheme?.id });

      ctx.body = {
        themeId: activeTheme?.id,
        appExtensionActived: actvied,
        email: data.shop.email,
        myshopifyDomain: data.shop.myshopifyDomain,
      } as InitializationApp;
    } else {
      throw new Error('Session token expired');
    }
  } catch (err) {
    reportService.createReportError({ error: err as Error, positionError: 'initializationApp' });
    ctx.status = CODE_ERROR;
    ctx.body = {
      message: err,
    };
  }
};

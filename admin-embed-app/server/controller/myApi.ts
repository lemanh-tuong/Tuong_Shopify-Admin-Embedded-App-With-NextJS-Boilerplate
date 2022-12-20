import { InitializationApp_ResponseSuccess, InitializationApp_ResponseError } from 'general/@types/BE/InitializationApp';
import { CODE_ERROR } from 'server/const';
import { API_VERSION } from 'server/env';
import { createClient, getShopProperties } from 'server/graphql';
import { getActiveTheme, getAppExtensionStatusActive, createSettings, getSettings, updateSettings, ShopifyRestError } from 'server/rest';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { getSessionTokenAfterVerify } from 'server/utils/getSessionAfterVerify';
import {
  CreateSettings_ExpectBodyData,
  CreateSettings_ResponseError,
  CreateSettings_ResponseSuccess,
} from 'general/@types/BE/UseMetafieldsAsDB/CreateSettings';
import { GetSettings_ResponseError, GetSettings_ResponseSuccess } from 'general/@types/BE/UseMetafieldsAsDB/GetSettings';
import {
  UpdateSettings_ExpectBodyData,
  UpdateSettings_ResponseError,
  UpdateSettings_ResponseSuccess,
} from 'general/@types/BE/UseMetafieldsAsDB/UpdateSettings';
import { Settings } from 'general/@types/FE/Settings';
import { IMiddleware } from 'koa-router';

/** api để lấy về những thứ cần dùng tại client
 * @property themeId: dùng để link tới builder của shopify -> dùng cho chức năng active theme app extension.
 * @property appExtensionActived: dùng để check trạng thái active của theme app extension -> để hiện lên thông báo là app chưa được bật
 * @link Chi tiết xem tại:  https://wilokesoftware.atlassian.net/wiki/spaces/SP/pages/396820492/Admin+embed
 */
export const initializationApp: IMiddleware = async ctx => {
  try {
    const { accessToken, shopDomain } = getSessionTokenAfterVerify({ ctx });
    const client = createClient({ shopDomain, accessToken, apiVersion: API_VERSION });
    const data = await getShopProperties({ client });
    const activeTheme = await getActiveTheme({ accessToken, myshopifyDomain: data.shop.myshopifyDomain });
    const actvied = await getAppExtensionStatusActive({ myshopifyDomain: data.shop.myshopifyDomain, accessToken, themeId: activeTheme?.id });

    ctx.body = {
      themeId: activeTheme?.id,
      appExtensionActived: actvied,
      email: data.shop.email,
      myshopifyDomain: data.shop.myshopifyDomain,
    } as InitializationApp_ResponseSuccess;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: 'initializationApp',
      additionalData: JSON.stringify(ctx.request),
    });
    if (error_ instanceof ShopifyRestError && error_.isAuthenticationError) {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: true,
      } as InitializationApp_ResponseError;
    } else {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: false,
      } as InitializationApp_ResponseError;
    }
  }
};

/** API để lưu settings vào metafield của shop */
export const createSettingsUseMetaFieldsAsDB: IMiddleware = async ctx => {
  try {
    const { settings } = ctx.request.body as CreateSettings_ExpectBodyData;
    const { accessToken, shopDomain } = getSessionTokenAfterVerify({ ctx });
    const data = await createSettings({ accessToken, myshopifyDomain: shopDomain, settings });
    ctx.body = {
      metafieldId: data.id,
      settings: JSON.parse(data.value) as Settings,
    } as CreateSettings_ResponseSuccess;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: 'createSettingsUseMetaFieldsAsDB',
      additionalData: JSON.stringify(ctx.request),
    });
    if (error_ instanceof ShopifyRestError && error_.isAuthenticationError) {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: true,
      } as CreateSettings_ResponseError;
    } else {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: false,
      } as CreateSettings_ResponseError;
    }
  }
};

/**
 * @deprecated -> tại thời điểm comment được viết api create metafield của shopify tự động ghi đè giá trị metafield có cùng key và namespace -> "createSettingsUseMetaFieldsAsDB" là đủ
 * API để lưu settings vào metafield của shop */
export const updateSettingsUseMetaFieldsAsDB: IMiddleware = async ctx => {
  try {
    const { settings, metafieldId } = ctx.request.body as UpdateSettings_ExpectBodyData;
    const { accessToken, shopDomain } = getSessionTokenAfterVerify({ ctx });
    const data = await updateSettings({ accessToken, myshopifyDomain: shopDomain, settings, metafieldId });
    ctx.body = {
      metafieldId: data.id,
      settings: JSON.parse(data.value) as Settings,
    } as UpdateSettings_ResponseSuccess;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: 'updateSettingsUseMetaFieldsAsDB',
      additionalData: JSON.stringify(ctx.request),
    });
    if (error_ instanceof ShopifyRestError) {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: true,
      } as UpdateSettings_ResponseError;
    } else {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: false,
      } as UpdateSettings_ResponseError;
    }
  }
};

/** API để lấy về settings được lưu ở metafield của shop */
export const getSettingsUseMetaFieldsAsDB: IMiddleware = async ctx => {
  try {
    const { accessToken, shopDomain } = getSessionTokenAfterVerify({ ctx });
    const data = await getSettings({ accessToken, myshopifyDomain: shopDomain });
    ctx.body = {
      data: data
        ? {
            metafieldId: data.id,
            settings: JSON.parse(data.value) as Settings,
          }
        : undefined,
    } as GetSettings_ResponseSuccess;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: 'getSettingsUseMetaFieldsAsDB',
      additionalData: JSON.stringify(ctx.request),
    });
    if (error_ instanceof ShopifyRestError && error_.isAuthenticationError) {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: true,
      } as GetSettings_ResponseError;
    } else {
      ctx.status = CODE_ERROR;
      ctx.body = {
        message: error_.message,
        isInvalidToken: false,
      } as GetSettings_ResponseError;
    }
  }
};

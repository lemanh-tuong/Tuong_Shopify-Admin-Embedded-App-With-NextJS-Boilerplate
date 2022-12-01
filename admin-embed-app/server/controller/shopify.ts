import { CODE_SUCCESS } from 'server/const';
import { WEBHOOK_TIMEOUT } from 'server/env';
import { handleRequest } from 'server/middlewares';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { offlineTokenService } from 'server/services/NguyenDttnServices';
import { IMiddleware } from 'koa-router';
import Shopify from '@shopify/shopify-api';

/** api để cho client có thể sử dụng graphql  */
export const graphql: IMiddleware = async ctx => {
  try {
    await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    // Có lẽ sẽ check nếu online token có vấn đề thì sẽ redirect lại khâu xử lí online token
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'graphql',
      additionalData: JSON.stringify(ctx.request),
    });
  } finally {
    ctx.body = {};
    ctx.status = CODE_SUCCESS;
  }
};

/** api để hứng webhook của shopify */
export const webhook: IMiddleware = async ctx => {
  try {
    const processWebhook = () => {
      return new Promise(res => {
        const timeout = setTimeout(() => {
          res(undefined);
          clearTimeout(timeout);
        }, WEBHOOK_TIMEOUT);
        Shopify.Webhooks.Registry.process(ctx.req, ctx.res).finally(() => {
          res(undefined);
          clearTimeout(timeout);
        });
      });
    };
    await processWebhook();
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'webhook',
      additionalData: JSON.stringify(ctx.request),
    });
  } finally {
    ctx.body = {};
    ctx.status = CODE_SUCCESS;
  }
};

/** api để xử lí điều hướng xử lí auth khi vào app */
const refreshedSession = new Map<string, boolean>(); // Fix lỗi khi build lại ===> "offlineToken" đã được lưu lại -> Không redirect đến "/install/auth/" -> Không redirect đến "/auth" -> Khi đó hàm "loadCurrentSession" của shopify sẽ luôn trả về undefined ----> Dùng biến này như 1 bản vá tạm thời
export const startApp: IMiddleware = async (ctx, next) => {
  try {
    const shop = String(ctx.query.shop);
    const session = await offlineTokenService.verifyOfflineToken({ shopName: shop });
    if (!!shop) {
      if (!session) {
        refreshedSession.set(shop, true);
        ctx.redirect(`/install/auth?shop=${shop}`);
      } else if (!refreshedSession.get(shop)) {
        refreshedSession.set(shop, true);
        // @tuong -> 1 điều kiện gì đó để redirect đến nơi lấy onlineToken
        ctx.redirect(`/auth?shop=${shop}`);
      } else {
        await handleRequest(ctx, next);
      }
    }
    await handleRequest(ctx, next);
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'startApp',
      additionalData: JSON.stringify(ctx.request),
    });
    await handleRequest(ctx, next);
  }
};

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

/** api để xử lí khi vào app */
export const startApp: IMiddleware = async (ctx, next) => {
  try {
    const shop = String(ctx.query.shop);
    const session = await offlineTokenService.verifyOfflineToken({ shopName: shop });
    if (!session) {
      ctx.redirect(`/install/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx, next);
    }
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'startApp',
      additionalData: JSON.stringify(ctx.request),
    });
    await handleRequest(ctx, next);
  }
};

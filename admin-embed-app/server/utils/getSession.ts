import { reportService } from 'server/services/FirebaseSentryErrorService';
import Shopify from '@shopify/shopify-api';
import { IRouterContext } from 'koa-router';

interface GetSession {
  ctx: IRouterContext;
}

export const getSession = async ({ ctx }: GetSession) => {
  try {
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res, true);
    return session;
  } catch (err) {
    reportService.createReportError({
      error: err as Error,
      positionError: 'getSession',
      additionalData: JSON.stringify(ctx.request),
    });
    return undefined;
  }
};

import { reportService } from 'server/services/FirebaseSentryErrorService';
import { getSession } from 'server/utils';
import { IMiddleware } from 'koa-router';

const CODE_AUTHORIZATION = 401;
const MESSAGE = {
  TOKEN_EXPIRED: 'Token expired',
  CATCH_CLAUSE: 'Token invalid',
};

/** middleware dùng để xử lí vấn đề verify token */
export const handleVerifyToken: IMiddleware = async (ctx, next) => {
  const shopName = ctx.request.header['x-shopname'] as string;
  try {
    const session = await getSession({ ctx });
    const isActive = new Date(session?.expires ?? 0).getTime() - Date.now() > 0;
    if (session && isActive && session.shop === shopName) {
      ctx.request.header['Shop-AccessToken'] = session.accessToken;
      await next();
    } else {
      ctx.status = CODE_AUTHORIZATION;
      ctx.body = MESSAGE.TOKEN_EXPIRED;
    }
  } catch (err) {
    ctx.status = CODE_AUTHORIZATION;
    ctx.body = MESSAGE.CATCH_CLAUSE;
    reportService.createReportError({ error: err as Error, positionError: 'handleVerifyToken', additionalData: JSON.stringify(ctx) });
  }
};

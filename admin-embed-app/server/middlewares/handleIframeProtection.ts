import { IMiddleware } from 'koa-router';
import Shopify from '@shopify/shopify-api';

const IFRAME_URL = '/';
const IFRAME_SEARCH_PARAMS = ['embedded', 'host', 'session', 'shop'];

/**
 * Middleware để thêm "Content-Security-Policy" theo yêu cầu của shopify
 * https://shopify.dev/apps/store/security/iframe-protection
 */
export const handleIframeProtection: IMiddleware = async (ctx, next) => {
  try {
    const shop = String(ctx.query.shop);
    if (
      Shopify.Context.IS_EMBEDDED_APP &&
      shop &&
      ctx.URL.pathname === IFRAME_URL &&
      IFRAME_SEARCH_PARAMS.every(param => ctx.URL.search.includes(param))
    ) {
      ctx.res.setHeader('Content-Security-Policy', `frame-ancestors https://${shop} https://admin.shopify.com;`);
    }
  } finally {
    await next();
  }
};

import { refreshedSessionStorage } from 'server/storage/refreshedSessionStorage';
import createShopifyAuth from '@shopify/koa-shopify-auth';

/** middleware xử lí online access token - tiền xử lí khi vào app */
export const handleOnlineAccessToken = createShopifyAuth({
  async afterAuth(ctx) {
    const { shop } = ctx.state.shopify;
    const host = ctx.query.host;

    // Làm cái gì đó với online token tại đây

    refreshedSessionStorage.set(shop, true);

    // Redirect to app with shop parameter upon auth
    ctx.redirect(`/?shop=${shop}&host=${host}`);
  },
});

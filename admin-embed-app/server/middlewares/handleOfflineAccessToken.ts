import { API_VERSION } from 'server/env';
import { createClient, getShopProperties } from 'server/graphql';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { registerService } from 'server/services/NguyenDttnServices/RegisterService';
import createShopifyAuth from '@shopify/koa-shopify-auth';

/** middleware xử lí offline access token - tiền xử lí khi vào app */
export const handleOfflineAccessToken = createShopifyAuth({
  accessMode: 'offline',
  prefix: '/install', // Phải update "Allowed redirection URL(s)" tại "App setup" (Partner) -> /install/auth/callback
  async afterAuth(ctx) {
    const { shop, accessToken } = ctx.state.shopify;
    // Làm cái gì đó với offline token tại đây
    try {
      const client = createClient({ shopDomain: shop, accessToken, apiVersion: API_VERSION });
      const { data } = await getShopProperties({ client });
      await registerService.register({
        accessToken,
        email: data.shop.email,
        shopName: data.shop.myshopifyDomain,
      });
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'handleOfflineAccessToken',
        additionalData: JSON.stringify({ shop, accessToken }),
      });
    }

    /**
     * @tuong ->
     * Khi vào app (ở chế độ dev) shopify sẽ redirect đến "/auth?shop=..." để xử lí auth online token trước
     * Mà app lại cần lấy offline token nên tại hàm "handleOnlineToken" sẽ redirect lại endpoint để lấy offline
     * Khi lấy offline có thể online sẽ hết hạn 1 lần nữa -> Redirect ngược lại auth online token để tạo mới online token
     */
    ctx.redirect(`/auth?shop=${shop}`);
  },
});

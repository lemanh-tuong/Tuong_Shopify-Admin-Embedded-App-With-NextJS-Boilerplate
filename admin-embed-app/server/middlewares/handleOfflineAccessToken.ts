import { API_VERSION } from 'server/env';
import { createClient, getShopProperties } from 'server/graphql';
import { reportService } from 'server/services/FirebaseSentryErrorService';
import { registerService } from 'server/services/NguyenDttnServices/RegisterService';
import { bulkService, pricingService, uninstallAppService } from 'server/services/NguyenDttnServices';
import createShopifyAuth from '@shopify/koa-shopify-auth';
import Shopify from '@shopify/shopify-api';

/** Lắng nghe webhook trả về */
Shopify.Webhooks.Registry.addHandler('APP_UNINSTALLED', {
  path: '/webhooks',
  webhookHandler: async (topic, shop, body) => {
    try {
      await uninstallAppService.uninstallApp({ shopName: shop });
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'APP_UNINSTALLED',
        additionalData: JSON.stringify({ topic, shop, body }),
      });
    }
  },
});

/** Lắng nghe webhook trả về */
Shopify.Webhooks.Registry.addHandler('APP_SUBSCRIPTIONS_UPDATE', {
  path: '/webhooks',
  webhookHandler: async (topic, shop, body) => {
    try {
      const data = JSON.parse(body);
      await pricingService.updatePricing({ shopName: shop, body: data.app_subscription });
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'APP_SUBSCRIPTIONS_UPDATE',
        additionalData: JSON.stringify({ topic, shop, body }),
      });
    }
  },
});

/** Lắng nghe webhook trả về */
Shopify.Webhooks.Registry.addHandler('BULK_OPERATIONS_FINISH', {
  path: '/webhooks',
  webhookHandler: async (topic, shop, body) => {
    // interface Body {
    //   admin_graphql_api_id: string;
    //   completed_at: string;
    //   created_at: string;
    //   error_code: string | null;
    //   status: string;
    //   type: string;
    // }
    try {
      await bulkService.pushBulk({ shopName: shop, body });
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'BULK_OPERATIONS_FINISH',
        additionalData: JSON.stringify({ topic, shop, body }),
      });
    }
  },
});

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

    try {
      /**
       * NOTE: @tuong -> Chỉ có thể register thêm webhook chứ không thể xoá bớt vì khi xoá đi webhook không return 200 thì tèo
       * Nếu không sử dụng gì đến online token có thể register webhook bên "handleOnlineToken.ts" - lưu ý khi đó cần sửa lại luồng redirect tại "startApp.ts"
       */
      const webhooks = await Promise.allSettled([
        Shopify.Webhooks.Registry.register({
          path: '/webhooks',
          topic: 'APP_UNINSTALLED',
          accessToken,
          shop,
        }),
        Shopify.Webhooks.Registry.register({
          path: '/webhooks',
          topic: 'APP_SUBSCRIPTIONS_UPDATE',
          accessToken,
          shop,
        }),
        Shopify.Webhooks.Registry.register({
          path: '/webhooks',
          topic: 'BULK_OPERATIONS_FINISH',
          accessToken: accessToken,
          shop: shop,
        }),
      ]);
      webhooks.forEach(webhook => {
        if (webhook.status === 'fulfilled') {
          const [webhookTopic, webhookRegisterResponse] = Object.entries(webhook.value)[0];
          if (!webhookRegisterResponse.success) {
            reportService.createReportError({
              error: new Error('Failed to register webook'),
              positionError: 'webhookRegisterResponse',
              additionalData: JSON.stringify({ webhookTopic, webhookRegisterResponse }),
            });
          }
        } else {
          reportService.createReportError({
            error: new Error('Failed to register webook 2'),
            positionError: 'webhookRegisterResponse',
            additionalData: JSON.stringify({ webhook }),
          });
        }
      });
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'webhook register',
        additionalData: 'webhook register',
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

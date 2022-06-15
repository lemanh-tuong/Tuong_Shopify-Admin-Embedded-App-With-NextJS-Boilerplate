import { ApiVersion } from '@shopify/shopify-api';

interface NextServerEnv {
  // Dùng để check app extension đang được active hay không
  APP_EMBED_EXTENSION_UUID: string;

  // Config của shopify next app
  PORT: string;
  HOST: string;
  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET: string;
  SCOPES: string;
  API_VERSION: ApiVersion;
  SHOP: string;

  // Redis - dùng để làm sessionStorage
  REDIS_URL: string;

  // Service Session Storage - dùng để làm sessionStorage
  SESSION_STORAGE_SERVICE_URL: string;

  // Service được chạy mỗi khi vào app
  REGISTER_SERVICE_URL: string;

  // Service gọi khi webhook gỡ app được shopify bắn về
  UNINSTALLED_SERVICE_URL: string;

  // Webhook cheat
  WEBHOOK_TIMEOUT: string;

  // SECRETKEY để tạo token bắn lên BE tại những api không có gì để bắn lên cho BE ngoài shopName
  SECRET_KEY_OF_SERVICE: string;

  // BULK SERVICE
  BULK_SERVICE_URL: string;
  BULK_TOKEN_FOR_SERVICE: string;

  // Offline token chạy ở bước tiền xử lí khi vào app (do shopify phụ trách thực hiện)
  OFFLINE_TOKEN_SERVICE: string;

  // Pricing Service
  PRICING_SERVICE_URL: string;

  // Tên app
  APP_NAME: string;
}

const isDev = process.env.NODE_ENV === 'development';
const nextServerEnv = (process.env as unknown) as NextServerEnv;

// Dùng để check app extension đang được active hay không
export const APP_EMBED_EXTENSION_UUID: string = nextServerEnv.APP_EMBED_EXTENSION_UUID;

// Config của shopify next app
export const PORT = Number(nextServerEnv.PORT ?? '8081');
export const HOST: string = nextServerEnv.HOST;
export const SHOPIFY_API_KEY: string = nextServerEnv.SHOPIFY_API_KEY;
export const SHOPIFY_API_SECRET: string = nextServerEnv.SHOPIFY_API_SECRET;
export const SCOPES: string[] = !isDev
  ? nextServerEnv.SCOPES.split(',')
  : 'read_analytics,read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,read_customers,write_customers,read_discounts,write_discounts,read_draft_orders,write_draft_orders,read_files,write_files,read_fulfillments,write_fulfillments,read_gdpr_data_request,read_gift_cards,write_gift_cards,read_inventory,write_inventory,read_legal_policies,write_legal_policies,read_locations,read_marketing_events,write_marketing_events,read_merchant_managed_fulfillment_orders,write_merchant_managed_fulfillment_orders,read_online_store_navigation,read_online_store_pages,write_online_store_pages,read_order_edits,write_order_edits,read_orders,write_orders,read_price_rules,write_price_rules,read_products,write_products,read_product_listings,write_product_listings,read_reports,write_reports,read_resource_feedbacks,write_resource_feedbacks,read_shipping,write_shipping,read_shopify_payments_accounts,read_shopify_payments_bank_accounts,read_shopify_payments_disputes,read_shopify_payments_payouts,read_content,write_content,read_themes,write_themes,read_third_party_fulfillment_orders,write_third_party_fulfillment_orders,read_translations,write_translations'.split(
      ',',
    );
export const API_VERSION: ApiVersion = nextServerEnv.API_VERSION;
export const SHOP: string = nextServerEnv.SHOP;

// Redis - dùng để làm sessionStorage
export const REDIS_URL: string = nextServerEnv.REDIS_URL;

// Service Session Storage - dùng để làm sessionStorage
export const SESSION_STORAGE_SERVICE_URL: string = nextServerEnv.SESSION_STORAGE_SERVICE_URL;

// Service được chạy mỗi khi vào app
export const REGISTER_SERVICE_URL: string = nextServerEnv.REGISTER_SERVICE_URL;

// Service gọi khi webhook gỡ app được shopify bắn về
export const UNINSTALLED_SERVICE_URL: string = nextServerEnv.UNINSTALLED_SERVICE_URL;

// Webhook cheat
export const WEBHOOK_TIMEOUT = Number(nextServerEnv.WEBHOOK_TIMEOUT);

// SECRETKEY để tạo token bắn lên BE tại những api không có gì để bắn lên cho BE ngoài shopName
export const SECRET_KEY_OF_SERVICE: string = nextServerEnv.SECRET_KEY_OF_SERVICE;

// BULK SERVICE
export const BULK_SERVICE_URL: string = nextServerEnv.BULK_SERVICE_URL;
export const BULK_TOKEN_FOR_SERVICE: string = nextServerEnv.BULK_TOKEN_FOR_SERVICE;

// Offline token chạy ở bước tiền xử lí khi vào app (do shopify phụ trách thực hiện)
export const OFFLINE_TOKEN_SERVICE: string = nextServerEnv.OFFLINE_TOKEN_SERVICE;

// Pricing Service
export const PRICING_SERVICE_URL: string = nextServerEnv.PRICING_SERVICE_URL;

// Tên app
export const APP_NAME: string = nextServerEnv.APP_NAME;

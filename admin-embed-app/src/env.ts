interface NextClientEnv {
  // TIDIO
  NEXT_PUBLIC_TIDIO_KEY: string;
  NEXT_PUBLIC_TIDIO_HELLO_MESSAGE: string; // Message chào khi mới vào app
  NEXT_PUBLIC_TIDIO_REQUEST_FEATURES_MESSAGE: string; // Message khi muốn yêu cầu thêm tính năng mới
  NEXT_PUBLIC_TIDIO_UNLOCK_FEATURES_MESSAGE: string; // Message khi muốn unlock 1 feature - cái mà cần phải pricing để mở nếu trong thời gian không có người support

  // @tuong -> @deprecated Access token được dùng ở component AccessToken
  NEXT_PUBLIC_GET_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT: string;
  NEXT_PUBLIC_CREATE_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT: string;

  // Pricing
  NEXT_PUBLIC_API_PROMO_CODE_URL: string;
  NEXT_PUBLIC_API_CHARGE_URL: string;
  NEXT_PUBLIC_API_CURRENT_PLAN: string;
  NEXT_PUBLIC_API_ALL_PLAN: string;

  // Tên của app
  NEXT_PUBLIC_APP_NAME: string;

  // API base url
  NEXT_PUBLIC_AXIOS_BASE_URL: string;

  // Link review app trên shopify store
  NEXT_PUBLIC_REVIEW_APP_URL: string;

  // Email feedback
  NEXT_PUBLIC_FEEDBACK_MAIL: string;

  // Chức năng lock feature
  NEXT_PUBLIC_ENABLE_CONTACT_US: string;
  NEXT_PUBLIC_CONTACT_US_MESSAGE: string;

  // App Recommendations
  NEXT_PUBLIC_APP_RECOMMENDATIONS_URL: string;

  // Xin rate
  NEXT_PUBLIC_GET_REVIEW_STATUS_API_URL: string;
  NEXT_PUBLIC_SET_REVIEW_STATUS_API_URL: string;

  NEXT_PUBLIC_YOUTUBE_LINK: string;
}

export const nextClientEnv = (process.env as unknown) as NextClientEnv;

// Bằng 1 cách nào đấy nếu xóa dòng này đi sẽ bị lỗi "process is not defined"
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
process.env.PORT;

// TIDIO
export const TIDIO_KEY: string = nextClientEnv.NEXT_PUBLIC_TIDIO_KEY;
export const TIDIO_HELLO_MESSAGE: string = nextClientEnv.NEXT_PUBLIC_TIDIO_HELLO_MESSAGE; // Message chào khi mới vào app
export const TIDIO_REQUEST_FEATURES_MESSAGE: string = nextClientEnv.NEXT_PUBLIC_TIDIO_REQUEST_FEATURES_MESSAGE; // Message khi muốn yêu cầu thêm tính năng mới
export const TIDIO_UNLOCK_FEATURES_MESSAGE: string = nextClientEnv.NEXT_PUBLIC_TIDIO_UNLOCK_FEATURES_MESSAGE; // Message khi muốn unlock 1 feature - cái mà cần phải pricing để mở nếu trong thời gian không có người support

// Lọt sàng xuống nia -> Nếu BE sai thì vẫn có thể dùng component "AccessToken" để xử lý offline token
export const GET_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT: string = nextClientEnv.NEXT_PUBLIC_GET_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT;
export const CREATE_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT: string = nextClientEnv.NEXT_PUBLIC_CREATE_OFFLINE_ACCESS_TOKEN_API_URL_IN_COMPONENT;

// Pricing
export const API_PROMO_CODE_URL: string = nextClientEnv.NEXT_PUBLIC_API_PROMO_CODE_URL;
export const API_CHARGE_URL: string = nextClientEnv.NEXT_PUBLIC_API_CHARGE_URL;
export const API_CURRENT_PLAN: string = nextClientEnv.NEXT_PUBLIC_API_CURRENT_PLAN;
export const API_ALL_PLAN: string = nextClientEnv.NEXT_PUBLIC_API_ALL_PLAN;

// Tên của app
export const APP_NAME: string = nextClientEnv.NEXT_PUBLIC_APP_NAME;

// API base url
export const AXIOS_BASE_URL: string = nextClientEnv.NEXT_PUBLIC_AXIOS_BASE_URL;

// Link review app trên shopify store
export const REVIEW_APP_URL: string = nextClientEnv.NEXT_PUBLIC_REVIEW_APP_URL;

// Email feedback
export const FEEDBACK_MAIL: string = nextClientEnv.NEXT_PUBLIC_FEEDBACK_MAIL;

// Chức năng lock feature
let ENABLE_CONTACT_US = false;
try {
  ENABLE_CONTACT_US = JSON.parse(nextClientEnv.NEXT_PUBLIC_ENABLE_CONTACT_US);
} catch {
  ENABLE_CONTACT_US = false;
}
export { ENABLE_CONTACT_US };

export const CONTACT_US_MESSAGE: string = nextClientEnv.NEXT_PUBLIC_CONTACT_US_MESSAGE;

// App Recommendations
export const APP_RECOMMENDATIONS_URL: string = nextClientEnv.NEXT_PUBLIC_APP_RECOMMENDATIONS_URL;

// Xin rate
export const GET_REVIEW_STATUS_API_URL: string = nextClientEnv.NEXT_PUBLIC_GET_REVIEW_STATUS_API_URL;
export const SET_REVIEW_STATUS_API_URL: string = nextClientEnv.NEXT_PUBLIC_SET_REVIEW_STATUS_API_URL;

export const YOUTUBE_LINK: string = nextClientEnv.NEXT_PUBLIC_YOUTUBE_LINK;

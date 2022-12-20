interface NextClientEnv {
  // TIDIO
  NEXT_PUBLIC_TIDIO_KEY: string;
  NEXT_PUBLIC_TIDIO_HELLO_MESSAGE: string; // Message chào khi mới vào app
  NEXT_PUBLIC_TIDIO_REQUEST_FEATURES_MESSAGE: string; // Message khi muốn yêu cầu thêm tính năng mới
  NEXT_PUBLIC_TIDIO_UNLOCK_FEATURES_MESSAGE: string; // Message khi muốn unlock 1 feature - cái mà cần phải pricing để mở nếu trong thời gian không có người support

  // API lấy offline token - nhằm đề phòng khi lấy offline token ở next server lỗi nhưng vẫn vào app - được dùng ở component AccessToken
  NEXT_PUBLIC_API_GET_OFFLINE_TOKEN_IN_NEXT_CLIENT: string;
  NEXT_PUBLIC_API_CREATE_OFFLINE_TOKEN_IN_NEXT_CLIENT: string;

  // FIXME: Pricing chưa lên được khung hoàn chỉnh

  // Tên của app
  NEXT_PUBLIC_APP_NAME: string;

  // Bản boilerplate chỉ có duy nhất 1 instance axios cho 1 service chính của đội BE
  NEXT_PUBLIC_MAIN_SERVICE_ENDPOINT: string;

  // Link review app trên shopify store
  NEXT_PUBLIC_REVIEW_APP_URL: string;

  // Email feedback
  NEXT_PUBLIC_FEEDBACK_MAIL: string;

  // Chức năng lock feature
  NEXT_PUBLIC_ENABLE_CONTACT_US_TO_UNLOCK_FEATURE: string; // Bật nếu có người trực và tắt nếu không có người trực
  NEXT_PUBLIC_CONTACT_US_TO_UNLOCK_FEATURE_DESCRIPTION: string; // Hiển thị đoạn text để người dùng biết có thể chat để xin mở tính năng thay vì mất tiền nâng pricing

  // App Recommendations
  NEXT_PUBLIC_APP_RECOMMENDATIONS_URL: string;

  // Xin rate
  NEXT_PUBLIC_API_GET_REVIEW_STATUS: string; // API check xem có hiển thị modal để xin review của người dùng hay không
  NEXT_PUBLIC_API_SET_REVIEW_STATUS: string; //

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
export const API_GET_OFFLINE_TOKEN_IN_NEXT_CLIENT: string = nextClientEnv.NEXT_PUBLIC_API_GET_OFFLINE_TOKEN_IN_NEXT_CLIENT;
export const API_CREATE_OFFLINE_TOKEN_IN_NEXT_CLIENT: string = nextClientEnv.NEXT_PUBLIC_API_CREATE_OFFLINE_TOKEN_IN_NEXT_CLIENT;

// FIXME: Pricing chưa lên được khung hoàn chỉnh

// Tên của app
export const APP_NAME: string = nextClientEnv.NEXT_PUBLIC_APP_NAME;

// Bản boilerplate chỉ có duy nhất 1 instance axios cho 1 service chính của đội BE
export const MAIN_SERVICE_ENDPOINT: string = nextClientEnv.NEXT_PUBLIC_MAIN_SERVICE_ENDPOINT;

// Link review app trên shopify store
export const REVIEW_APP_URL: string = nextClientEnv.NEXT_PUBLIC_REVIEW_APP_URL;

// Email feedback
export const FEEDBACK_MAIL: string = nextClientEnv.NEXT_PUBLIC_FEEDBACK_MAIL;

// Chức năng lock feature
let ENABLE_CONTACT_US_TO_UNLOCK_FEATURE = false;
try {
  ENABLE_CONTACT_US_TO_UNLOCK_FEATURE = JSON.parse(nextClientEnv.NEXT_PUBLIC_ENABLE_CONTACT_US_TO_UNLOCK_FEATURE);
} catch {
  ENABLE_CONTACT_US_TO_UNLOCK_FEATURE = false;
}
export { ENABLE_CONTACT_US_TO_UNLOCK_FEATURE };

export const CONTACT_US_TO_UNLOCK_FEATURE_DESCRIPTION: string = nextClientEnv.NEXT_PUBLIC_CONTACT_US_TO_UNLOCK_FEATURE_DESCRIPTION;

// App Recommendations
export const APP_RECOMMENDATIONS_URL: string = nextClientEnv.NEXT_PUBLIC_APP_RECOMMENDATIONS_URL;

// Xin rate
export const API_GET_REVIEW_STATUS: string = nextClientEnv.NEXT_PUBLIC_API_GET_REVIEW_STATUS;
export const API_SET_REVIEW_STATUS: string = nextClientEnv.NEXT_PUBLIC_API_SET_REVIEW_STATUS;

export const YOUTUBE_LINK: string = nextClientEnv.NEXT_PUBLIC_YOUTUBE_LINK;

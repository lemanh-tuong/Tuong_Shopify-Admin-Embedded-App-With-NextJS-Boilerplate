export interface InitializationApp_ResponseSuccess {
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  email: string;
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  myshopifyDomain: string;
  /** Để sử dụng cho tính năng redirect đến shopify editor - nơi active theme app extension */
  themeId: number | undefined | null;
  /** Để hiển thị thông báo có cần active theme app extension hay không */
  appExtensionActived: boolean;
}

export interface InitializationApp_ResponseError {
  message: string;
  isInvalidToken: boolean;
}

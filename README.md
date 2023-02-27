# DEPREACTED

#### Phiên bản mới: [TUONG_Shopify-Admin-Embeded-App-With-Express-Boilerplate](https://github.com/lemanh-tuong/TUONG_Shopify-Admin-Embeded-App-With-Express-Boilerplate)

#### Warning: Repo sẽ không thể hoạt động kể từ ngày 31/05/2023

- Một số thư viện của shopify cung cấp đã ngừng maintain 
  - [`@shopify/koa-shopify-auth`](https://github.com/Shopify/koa-shopify-auth)

- Shopify CLI 2.x sẽ ngừng hỗ trợ kể từ ngày 31/05/2023
- Luồng auth đang không hoạt động giống như lúc trước - 1 số lỗi đang xảy ra
  - Khi "SCOPES" được update middleware "handleOfflineToken" sẽ không chạy.
  - Khi restart server các middlewares "handleOfflineToken" và "handleOnlineToken" sẽ không chạy -> middleware "handleVerifyToken" sẽ luôn trả về 403 do "handleOnlineToken" là nơi refresh lại session token
  - ...

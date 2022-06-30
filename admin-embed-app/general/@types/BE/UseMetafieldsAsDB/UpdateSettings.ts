import { Settings } from 'general/@types/FE/Settings';

export interface UpdateSettings_ExpectBodyData {
  settings: Settings;
  metafieldId: number;
}

export interface UpdateSettings_Response {
  /** Trả lại settings sau lưu */
  settings: Settings;
  /** Trả lại id để phòng trường hợp api create metafield của shopify không còn tự động ghi đè giá trị cũ nữa mà phải dùng api update metafield  */
  metafieldId: number;
}

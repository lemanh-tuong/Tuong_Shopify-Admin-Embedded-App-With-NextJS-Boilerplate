import { Settings } from 'general/@types/FE/Settings';

export interface UpdateSettings_ExpectBodyData {
  settings: Settings;
  metafieldId: number;
}

export interface UpdateSettings_Response {
  settings: Settings;
  metafieldId: number;
}

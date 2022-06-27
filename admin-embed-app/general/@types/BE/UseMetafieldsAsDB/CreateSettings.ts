import { Settings } from 'general/@types/FE/Settings';

export interface CreateSettings_ExpectBodyData {
  settings: Settings;
}

export interface CreateSettings_Response {
  settings: Settings;
  metafieldId: number;
}

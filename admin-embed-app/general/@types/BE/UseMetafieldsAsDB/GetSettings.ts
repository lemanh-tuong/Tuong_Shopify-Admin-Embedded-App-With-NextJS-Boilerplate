import { Settings } from 'general/@types/FE/Settings';

interface ExistSetting {
  settings: Settings;
  metafieldId: number;
}

export interface GetSettings_Response {
  data: ExistSetting | undefined;
}

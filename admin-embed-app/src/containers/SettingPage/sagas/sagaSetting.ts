import { watchGetDefaultSetting } from './watchGetDefaultSetting';
import { watchSaveSetting } from './watchSaveSetting';

export const sagasSetting = [watchGetDefaultSetting, watchSaveSetting];

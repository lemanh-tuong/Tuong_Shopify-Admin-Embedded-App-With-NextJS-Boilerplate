import { reducerAppRecommendations } from 'src/containers/AppRecommendations';
import { reducerInitialization } from 'src/pages/InitializationPage';
import { reducerSetting } from 'src/pages/SettingPage';

export const rootReducers = {
  initialization: reducerInitialization,
  app_recommendations: reducerAppRecommendations,
  setting: reducerSetting,
};

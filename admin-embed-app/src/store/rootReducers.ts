import { reducerAppRecommendations } from 'src/containers/AppRecommendations';
import { reducerInitialization } from 'src/containers/InitializationPage';
import { reducerPlans } from 'src/containers/PricingPage/reducers';
import { reducerSetting } from 'src/containers/SettingPage/reducers/reducerSetting';

export const rootReducers = {
  initialization: reducerInitialization,
  app_recommendations: reducerAppRecommendations,
  plan: reducerPlans,
  setting: reducerSetting,
};

import { sagasAppRecommendations } from 'src/containers/AppRecommendations';
import { sagasInitializationPage } from 'src/pages/InitializationPage';
import { sagasSetting } from 'src/pages/SettingPage';
import { all, call, delay, spawn } from 'redux-saga/effects';

const sagas = [...sagasInitializationPage, ...sagasAppRecommendations, ...sagasSetting];

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga: any) => {
  return function* () {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};

const rootSagas_ = sagas.map(makeRestartable);

export function* rootSagas() {
  yield all(rootSagas_.map(call));
}

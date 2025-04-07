import { all } from 'redux-saga/effects';
import {
  watchPostResponeSagas,
  watchFetchUserLoginSagas,
  watchFetchUsersSagas,
  watchFetchUserSagas,
} from './index.js';

export function* rootSaga() {
  yield all([
    watchFetchUsersSagas(),
    watchPostResponeSagas(),
    watchFetchUserLoginSagas(),
    watchFetchUserSagas(),
  ]);
}

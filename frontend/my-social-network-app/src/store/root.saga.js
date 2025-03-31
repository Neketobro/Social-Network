import { all } from "redux-saga/effects";
import { watchFetchUsersSagas } from "./users/users.sagas.js";
import { watchFetchUserLoginSagas } from "./userLogin/userLogin.sagas.js";
import { watchPostResponeSagas } from "./post/post.sagas.js";

export function* rootSaga() {
    yield all([
        watchFetchUsersSagas(), 
        watchPostResponeSagas(),
        watchFetchUserLoginSagas(),
    ]);
}
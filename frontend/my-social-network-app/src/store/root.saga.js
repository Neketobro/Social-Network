import { all } from "redux-saga/effects";
import { watchFetchUsersSagas } from "./users/users.sagas.js";
// import { watchFetchUsersIsLoginSagas } from "./isUser/isUser.sagas.js";
import { watchPostResponeSagas } from "./post/post.sagas.js";

export function* rootSaga() {
    yield all([
        watchFetchUsersSagas(), 
        watchPostResponeSagas(),
        // watchFetchUsersIsLoginSagas(),
    ]);
}
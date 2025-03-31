import { getUserLogin } from "../../api/index.js";
import { put, call, takeLatest } from 'redux-saga/effects';
import {
    FETCH_USER_LOGIN,
    FETCH_USER_LOGIN_LOADING,
    FETCH_USER_LOGIN_SUCCESS,
    FETCH_USER_LOGIN_ERROR,
    FETCH_USER_REGISTER,
    USER_ADD_SUBSCRIDERS
} from "./userLogin.action.js";

export function* fetchUsersLoginSaga({ payload }) {
    yield put(FETCH_USER_LOGIN_LOADING());

    try {
        const response = yield call(getUserLogin, payload);

        if (response.length === 0) {
            yield put(FETCH_USER_LOGIN_ERROR("User not found!"));
            return;
        }
        const isUser = response[0];
        sessionStorage.setItem("isUser", JSON.stringify(isUser));

        yield put(FETCH_USER_LOGIN_SUCCESS(response));
    } catch (e) {
        console.log(e);
        yield put(FETCH_USER_LOGIN_ERROR());
    }
}

export function* watchFetchUserLoginSagas() {
    yield takeLatest(FETCH_USER_LOGIN, fetchUsersLoginSaga);
}
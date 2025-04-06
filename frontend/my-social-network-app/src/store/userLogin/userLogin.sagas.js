import { isUserLogin, fetchProtectedData, addSubscriber, deleteSubscriber } from "../../api/index.js";
import { put, call, takeLatest } from 'redux-saga/effects';
import {
    FETCH_USER_LOGIN,
    FETCH_USER_LOGIN_LOADING,
    FETCH_USER_LOGIN_SUCCESS,
    FETCH_USER_LOGIN_ERROR,
    FETCH_USER_REGISTER,
    USER_ADD_SUBSCRIBERS,
    USER_DELETE_SUBSCRIBERS,
    FETCH_USER_PROTECTED_DATA_ERROR,
    FETCH_USER_PROTECTED_DATA_SUCCESS,
    FETCH_USER_PROTECTED_DATA
} from "./userLogin.action.js";

export function* fetchUsersLoginSaga({ payload }) {
    yield put(FETCH_USER_LOGIN_LOADING());

    try {
        const response = yield call(isUserLogin, payload);

        if (!response || response.error) {
            yield put(FETCH_USER_LOGIN_ERROR(response.error));
            return;
        }
        sessionStorage.setItem("token", response.token);

        yield put(FETCH_USER_LOGIN_SUCCESS());
        yield put(FETCH_USER_PROTECTED_DATA());
    } catch (e) {
        console.log(e);
        yield put(FETCH_USER_LOGIN_ERROR());
    }
}

export function* fetchProtectedDataSaga() {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
        const response = yield call(fetchProtectedData, token);

        if (!response || response.error) {
            yield put(FETCH_USER_PROTECTED_DATA_ERROR(response.error));
            return;
        }

        yield put(FETCH_USER_PROTECTED_DATA_SUCCESS(response.user));
    } catch (e) {
        console.log(e);
        yield put(FETCH_USER_PROTECTED_DATA_ERROR());
    }
}

export function* addSubscribersSaga(payload) {
    yield put(FETCH_USER_LOGIN_LOADING());
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
        yield call(addSubscriber, payload);

        yield put(FETCH_USER_PROTECTED_DATA());
    } catch (e) {
        console.log(e);
        yield put(FETCH_USER_PROTECTED_DATA_ERROR());
    }
}

export function* deleteSubscribersSaga(payload) {
    yield put(FETCH_USER_LOGIN_LOADING());
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
        yield call(deleteSubscriber, payload);
        
        yield put(FETCH_USER_PROTECTED_DATA());
    } catch (e) {
        console.log(e);
        yield put(FETCH_USER_PROTECTED_DATA_ERROR());
    }
}

export function* watchFetchUserLoginSagas() {
    yield takeLatest(FETCH_USER_LOGIN, fetchUsersLoginSaga);
    yield takeLatest(FETCH_USER_PROTECTED_DATA, fetchProtectedDataSaga);
    yield takeLatest(USER_ADD_SUBSCRIBERS, addSubscribersSaga);
    yield takeLatest(USER_DELETE_SUBSCRIBERS, deleteSubscribersSaga);
}
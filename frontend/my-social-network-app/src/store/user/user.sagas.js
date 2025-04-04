import { getUserLogin } from "../../api";
import { put, call, takeLatest, select } from 'redux-saga/effects';
import {
    FETCH_USER,
    FETCH_USER_LOADING,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
} from "./user.action.js";
import { selectUserStatus } from "./user.slice.js";

export function* fetchUserSaga({ payload }) {
    yield put(FETCH_USER_LOADING());
    const status = select(selectUserStatus);

    if (status === 'loading') return;
    try {
        const response = yield call(getUserLogin, payload);

        yield put(FETCH_USER_SUCCESS(response.user));
    } catch (e) {
        console.log(e);
        yield put(FETCH_USER_ERROR());
    }
}

export function* watchFetchUserSagas() {
    yield takeLatest(FETCH_USER, fetchUserSaga);
}
    

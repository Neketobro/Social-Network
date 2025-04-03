import { addPost, getPosts, deletePost } from "../../api";
import { put, call, takeLatest, select } from 'redux-saga/effects';
import {
    POST_RESPONE,
    POST_RESPONE_LOADING,
    POST_RESPONE_SUCCESS,
    POST_RESPONE_ERROR,
    POST_RESPONE_ADD,
    DELETE_POST,
} from "./post.action.js";
import { selectPostStatus } from "./post.slice.js";

export function* fetchPostsSaga({ payload }) {
    yield put(POST_RESPONE_LOADING());
    const status = select(selectPostStatus);

    if (status === "loading") return;
    try {
        const response = yield call(getPosts, payload);

        yield put(POST_RESPONE_SUCCESS(response));
    } catch (e) {
        console.log(e);
        yield put(POST_RESPONE_ERROR());
    }
}

export function* postResponeSaga({ payload }) {
    yield put(POST_RESPONE_LOADING());
    const status = select(selectPostStatus);

    if (status === "loading") return;
    try {
        yield call(addPost, payload);

        yield put(POST_RESPONE_SUCCESS());
    } catch (e) {
        console.log(e);
        yield put(POST_RESPONE_ERROR());
    }
}

export function* postResponeDeleteSaga({ payload }) {
    yield put(POST_RESPONE_LOADING());
    const status = select(selectPostStatus);
    try {
        if (status === "loading") return;
        yield call(deletePost, payload);

        yield put(POST_RESPONE_SUCCESS());
        yield put(POST_RESPONE());
    } catch (e) {
        console.log(e);
        yield put(POST_RESPONE_ERROR());
    }
}

export function* watchPostResponeSagas() {
    yield takeLatest(POST_RESPONE, fetchPostsSaga);
    yield takeLatest(POST_RESPONE_ADD, postResponeSaga);
    yield takeLatest(DELETE_POST, postResponeDeleteSaga);
}
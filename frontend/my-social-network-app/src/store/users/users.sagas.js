import { getUsers } from '../../api/index.js';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import {
  FETCH_USERS,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
} from './users.action.js';
import { selectUsersStatus } from './users.slice.js';

export function* fetchUsersSaga({ payload }) {
  yield put(FETCH_USERS_LOADING());
  const status = select(selectUsersStatus);

  if (status === 'loading') return;
  try {
    const response = yield call(getUsers, payload);

    yield put(FETCH_USERS_SUCCESS(response));
  } catch (e) {
    console.log(e);
    yield put(FETCH_USERS_ERROR());
  }
}

export function* watchFetchUsersSagas() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}

import { createAction } from '@reduxjs/toolkit';

export const FETCH_USER = createAction('user/fetchUser');

export const FETCH_USER_LOADING = createAction('user/fetchUser/loading');
export const FETCH_USER_SUCCESS = createAction('user/fetchUser/success');
export const FETCH_USER_ERROR = createAction('user/fetchUser/error');

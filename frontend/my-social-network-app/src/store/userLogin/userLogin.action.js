import { createAction } from '@reduxjs/toolkit';

export const FETCH_USER_LOGIN = createAction('fetch/user/login');

export const FETCH_USER_LOGIN_LOADING = createAction(
  'fetch/users/login/loading'
);
export const FETCH_USER_LOGIN_SUCCESS = createAction(
  'fetch/user/login/success'
);
export const FETCH_USER_LOGIN_ERROR = createAction('fetch/user/login/error');

export const FETCH_USER_PROTECTED_DATA = createAction(
  'fetch/user/protected/data'
);
export const FETCH_USER_PROTECTED_DATA_ERROR = createAction(
  'fetch/user/protected/data/error'
);
export const FETCH_USER_PROTECTED_DATA_SUCCESS = createAction(
  'fetch/user/protected/data/success'
);

export const FETCH_USER_REGISTER = createAction('fetch/user/register');
export const FETCH_USER_REGISTER_SUCCESS = createAction(
  'fetch/user/register/success'
);
export const FETCH_USER_REGISTER_ERROR = createAction(
  'fetch/user/register/error'
);

export const USER_ADD_SUBSCRIBERS = createAction('user/add/subscribers');
export const USER_DELETE_SUBSCRIBERS = createAction('user/delete/subscribers');

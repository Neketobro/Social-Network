import { createAction } from '@reduxjs/toolkit';

export const FETCH_USERS = createAction('users/fetchUsers');

export const FETCH_USERS_LOADING = createAction('users/fetchUsers/loading');
export const FETCH_USERS_SUCCESS = createAction('users/fetchUsers/success');
export const FETCH_USERS_ERROR = createAction('users/fetchUsers/error');

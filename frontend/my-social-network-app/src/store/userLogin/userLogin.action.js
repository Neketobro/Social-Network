import { createAction } from "@reduxjs/toolkit";

export const FETCH_USER_LOGIN = createAction("fetch/users/login");

export const FETCH_USER_LOGIN_LOADING = createAction("fetch/users/login/loading");
export const FETCH_USER_LOGIN_SUCCESS = createAction("fetch/users/login/success");
export const FETCH_USER_LOGIN_ERROR = createAction("fetch/users/login/error");

export const FETCH_USER_REGISTER = createAction("fetch/users/register");

export const USER_ADD_SUBSCRIDERS = createAction("user/add/subscribers");
export const USER_DELETE_SUBSCRIDERS = createAction("user/delete/subscribers");

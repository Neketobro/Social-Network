import { createSlice } from '@reduxjs/toolkit';
import {
  FETCH_USER_LOGIN_LOADING,
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGIN_ERROR,
  FETCH_USER_PROTECTED_DATA_SUCCESS,
  FETCH_USER_PROTECTED_DATA_ERROR,
  FETCH_USER_REGISTER_SUCCESS,
  FETCH_USER_REGISTER_ERROR,
} from './userLogin.action';

const initialState = {
  userLogin: null,
  status: null,
  error: null,
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {},
  selectors: {
    selectUserLogin: (state) => state.userLogin,
    selectUserLoginStatus: (state) => state.status,
    selectUserLoginError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_USER_LOGIN_LOADING, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(FETCH_USER_LOGIN_SUCCESS, (state, { payload }) => {
        state.status = 'success';
        state.userLogin = payload;
        state.error = null;
      })
      .addCase(FETCH_USER_LOGIN_ERROR, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      })
      .addCase(FETCH_USER_REGISTER_SUCCESS, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(FETCH_USER_REGISTER_ERROR, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      })
      .addCase(FETCH_USER_PROTECTED_DATA_SUCCESS, (state, { payload }) => {
        state.status = 'success';
        state.userLogin = payload;
        state.error = null;
      })
      .addCase(FETCH_USER_PROTECTED_DATA_ERROR, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      });
  },
});

export default userLoginSlice.reducer;

export const { selectUserLogin, selectUserLoginStatus, selectUserLoginError } =
  userLoginSlice.selectors;

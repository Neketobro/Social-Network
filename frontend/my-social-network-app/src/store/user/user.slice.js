import { createSlice } from '@reduxjs/toolkit';
import {
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from './user.action';

const initialState = {
  user: {},
  status: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectUserStatus: (state) => state.status,
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_USER_LOADING, (state) => {
        state.status = 'loading';
      })
      .addCase(FETCH_USER_SUCCESS, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(FETCH_USER_ERROR, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      });
  },
});

export default userSlice.reducer;

export const { selectUser, selectUserStatus } = userSlice.selectors;

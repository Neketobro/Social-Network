import { createSlice } from '@reduxjs/toolkit';
import {
  POST_RESPONE_LOADING,
  POST_RESPONE_SUCCESS,
  POST_RESPONE_ERROR,
  POST_RESPONE_DELETE_SUCCESS,
} from './post.action.js';

const initialState = {
  post: [],
  status: null,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  selectors: {
    selectPost: (state) => state.post || [],
    selectPostStatus: (state) => state.status,
    selectPostError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(POST_RESPONE_LOADING, (state) => {
        state.status = 'loading';
      })
      .addCase(POST_RESPONE_SUCCESS, (state, { payload }) => {
        state.status = 'success';
        state.post = payload;
      })
      .addCase(POST_RESPONE_DELETE_SUCCESS, (state) => {
        state.status = 'success';
      })
      .addCase(POST_RESPONE_ERROR, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      });
  },
});

export default postSlice.reducer;

export const { selectPost, selectPostStatus, selectPostError } =
  postSlice.selectors;

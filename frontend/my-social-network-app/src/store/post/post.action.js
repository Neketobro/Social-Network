import { createAction } from "@reduxjs/toolkit";

export const POST_RESPONE = createAction("post/respone");
export const FETCH_POST = createAction("fetch/post");

export const POST_RESPONE_LOADING = createAction("post/respone/loading");
export const POST_RESPONE_SUCCESS = createAction("post/respone/success");
export const POST_RESPONE_DELETE_SUCCESS = createAction("post/respone/delete/success");
export const POST_RESPONE_ERROR = createAction("post/respone/error");

export const POST_RESPONE_ADD = createAction("post/respone/add");
export const DELETE_POST = createAction("post/delete");

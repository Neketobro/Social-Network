import { createSlice } from "@reduxjs/toolkit";
import {
    FETCH_USERS_LOADING,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,
} from "./users.action";

const initialState = {
    users: [],
    status: null,
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    selectors: {
        selectUser: (state) => state.value,
        selectUserStatus: (state) => state.status,
    },
    extraReducers: (builder) => {
        builder
            .addCase(FETCH_USERS_LOADING, (state) => {
                state.status = "loading";
            })
            .addCase(FETCH_USERS_SUCCESS, (state, { payload }) => {
                state.status = "success";
                state.value = payload;
            })
            .addCase(FETCH_USERS_ERROR, (state, { payload }) => {
                state.status = "error";
                state.error = payload;
            });
    },
})

export default usersSlice.reducer;

export const { selectUsers, selectUsersStatus } = usersSlice.selectors;
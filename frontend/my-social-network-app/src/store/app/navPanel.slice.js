import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: null,
};
const navPanelSlice = createSlice({
    name: 'navPanel',
    initialState,
    reducers: {
        setOpen: (state, { payload }) => {
            state.open = payload !== undefined
                ? payload
                : !state.open;
        }
    },
    selectors: {
        selectNavPanel: (state) => state.open,
    },
});

export const { setOpen } = navPanelSlice.actions;
export const { selectNavPanel } = navPanelSlice.selectors;
export default navPanelSlice.reducer;
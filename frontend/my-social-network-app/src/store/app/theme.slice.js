import { createSlice } from '@reduxjs/toolkit';
import { LIGHT_THEME } from '../../services/constants';

const savedTheme = localStorage.getItem('theme');
const initialState = {
  theme: savedTheme ? savedTheme : LIGHT_THEME,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
      localStorage.setItem('theme', payload);
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
  },
});

export const { setTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;
export default themeSlice.reducer;

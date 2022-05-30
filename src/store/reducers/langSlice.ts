import { createSlice } from '@reduxjs/toolkit';

interface LangState {
  lang: 'en' | 'ru';
}

const initialState: LangState = {
  lang: 'en',
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    toggleLang: state => {
      const lang = state.lang === 'en' ? 'ru' : 'en';
      state.lang = lang;
      localStorage.setItem('lang', lang);
    },
    restoreLang: state => {
      const lang = localStorage.getItem('lang') || '';
      if (lang) {
        state.lang = lang as 'en' | 'ru';
      }
    },
  },
});

export const { toggleLang, restoreLang } = langSlice.actions;

export default langSlice.reducer;

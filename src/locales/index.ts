import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '~/store';

import en from './en.json';
import ru from './ru.json';

const lang = store.getState().locale.lang;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng: lang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

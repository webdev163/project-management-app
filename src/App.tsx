import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import { restoreToken, setUserId, setUserLogin } from './store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getDecodedToken } from '~/utils/getDecodedToken';
import { DecodedTokenData } from './types/api';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { restoreLang } from './store/reducers/langSlice';

import './style/style.scss';

import en from '~/locales/en.json';
import ru from '~/locales/ru.json';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  useEffect(() => {
    dispatch(restoreToken());
    dispatch(restoreLang());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const { userId, login } = getDecodedToken() as DecodedTokenData;
      dispatch(setUserId(userId));
      dispatch(setUserLogin(login));
    }
  }, [dispatch, token]);

  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

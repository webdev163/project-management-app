import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import { restoreToken, setUserId, setUserLogin } from './store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getDecodedToken } from '~/utils/getDecodedToken';
import { DecodedTokenData } from './types/api';
import { restoreLang } from './store/reducers/langSlice';
import '~/locales';

import './style/style.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);

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
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;

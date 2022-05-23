import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import { restoreToken, setUserId, setUserLogin, setUserName } from './store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getDecodedToken } from '~/utils/getDecodedToken';
import { DecodedTokenData } from './types/api';
import { restoreLang } from './store/reducers/langSlice';
import { getUserName } from '~/utils/getUserName';
import '~/locales';

import './style/style.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);

  const getName = async (userId: string) => {
    const userName = await getUserName(userId);
    dispatch(setUserName(userName));
  };

  useEffect(() => {
    dispatch(restoreToken());
    dispatch(restoreLang());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const { userId, login } = getDecodedToken() as DecodedTokenData;
      dispatch(setUserId(userId));
      dispatch(setUserLogin(login));
      getName(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;

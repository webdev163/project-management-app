import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import { restoreToken } from './store/reducers/authSlice';
import { useAppDispatch } from './hooks/redux';

import './style/style.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreToken());
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

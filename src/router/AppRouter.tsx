import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import MainPage from '~/pages/MainPage';
import WelcomePage from '~/pages/WelcomePage';
import LoginPage from '~/pages/LoginPage';
import Board from '~/components/Board';
import SignupPage from '~/pages/SignupPage';
import EditProfilePage from '~/pages/EditProfilePage';
import Logout from '~/components/Logout';
import { useAppSelector } from '~/hooks/redux';

const AppRouter: FC = () => {
  const { isLogged } = useAppSelector(state => state.auth);
  return (
    <Routes>
      {isLogged && (
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<EditProfilePage />} />
          <Route path="board" element={<Board />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
      {!isLogged && (
        <Route path="/" element={<App />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRouter;

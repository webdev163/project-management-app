import React, { FC, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Logout from '~/components/Logout';
import { useAppSelector } from '~/hooks/redux';
import ErrorBoundary from '~/components/ErrorBoundary';
import Loader from '~/components/Loader';

const App = lazy(() => import('../App'));
const LoginPage = lazy(() => import('~/pages/LoginPage'));
const SignupPage = lazy(() => import('~/pages/SignupPage'));
const EditProfilePage = lazy(() => import('~/pages/EditProfilePage'));
const Board = lazy(() => import('~/components/Board'));
const MainPage = lazy(() => import('~/pages/MainPage'));
const WelcomePage = lazy(() => import('~/pages/WelcomePage'));

const AppRouter: FC = () => {
  const { isLogged } = useAppSelector(state => state.auth);
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div
            style={{ width: '100vw', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Loader />
          </div>
        }
      >
        <Routes>
          {isLogged && (
            <Route path="/" element={<App />}>
              <Route index element={<MainPage />} />
              <Route path="logout" element={<Logout />} />
              <Route path="profile" element={<EditProfilePage />} />
              <Route path="board" element={<Board />} />
              <Route path="welcome" element={<WelcomePage />} />
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
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRouter;

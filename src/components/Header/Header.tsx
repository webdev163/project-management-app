import React, { FC } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/hooks/redux';

import styles from './Header.module.scss';

const Header: FC = () => {
  const { isLogged } = useAppSelector(state => state.auth);
  const { pathname } = useLocation();
  return (
    <div className={styles.wrapper}>
      <div className={matchPath(pathname, '/board') ? `${styles.navbar} ${styles.navbarModified}` : styles.navbar}>
        {!isLogged && (
          <>
            <NavLink to="/login" className={styles.link}>
              Войти
            </NavLink>
            <NavLink to="/signup" className={styles.link}>
              Зарегистрироваться
            </NavLink>
          </>
        )}
        {isLogged && (
          <>
            {matchPath(pathname, '/board') && (
              <NavLink to="/mainPage" className={styles.link}>
                ← Назад
              </NavLink>
            )}
            <NavLink to="/logout" className={styles.link}>
              Выйти
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

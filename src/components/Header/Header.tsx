import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <NavLink to="/" className={styles.link}>
          Main
        </NavLink>
        <NavLink to="/login" className={styles.link}>
          Login
        </NavLink>
        <NavLink to="/welcome" className={styles.link}>
          Welcome
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks/redux';
import LangCheckbox from '../LangCheckbox';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: FC = () => {
  const { isLogged } = useAppSelector(state => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  }, []);

  return (
    <>
      <div className={`${styles.wrapper} ${isSticky ? 'sticky' : ''}`}>
        <div className={styles.navbar}>
          {!isLogged && (
            <>
              <Button variant="contained" onClick={() => navigate('/login')} sx={{ marginLeft: 1, marginRight: 1 }}>
                {t('LOGIN_LINK')}
              </Button>
              <Button variant="contained" onClick={() => navigate('/signup')} sx={{ marginLeft: 1, marginRight: 1 }}>
                {t('SIGNUP_LINK')}
              </Button>
            </>
          )}
          {isLogged && (
            <>
              <Button variant="contained" onClick={() => navigate('/logout')} sx={{ marginLeft: 1, marginRight: 1 }}>
                {t('LOGOUT_LINK')}
              </Button>
              <Button variant="contained" onClick={() => navigate('/profile')} sx={{ marginLeft: 1, marginRight: 1 }}>
                {t('EDIT_PROFILE_LINK')}
              </Button>
              {pathname === '/welcome' ? (
                <Button variant="contained" onClick={() => navigate('/')} sx={{ marginLeft: 1, marginRight: 1 }}>
                  {t('MAIN_PAGE_LINK')}
                </Button>
              ) : (
                <Button variant="contained" onClick={() => navigate('/welcome')} sx={{ marginLeft: 1, marginRight: 1 }}>
                  {t('WELCOME_PAGE_LINK')}
                </Button>
              )}
            </>
          )}
          <LangCheckbox />
        </div>
      </div>
      <div style={{ height: isSticky ? '65px' : '120px' }}></div>
    </>
  );
};

export default Header;

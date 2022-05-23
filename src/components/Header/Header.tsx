import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/hooks/redux';
import LangCheckbox from '../LangCheckbox';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { getGreeting } from '~/utils/getGreeting';
import BoardCreateModal from '../BoardCreateModal';

import styles from './Header.module.scss';

const Header: FC = () => {
  const { isLogged, name } = useAppSelector(state => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [isSticky, setIsSticky] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 75) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  }, []);

  const onBoardCreate = () => {
    setIsModalActive(true);
  };

  return (
    <>
      <div className={`${styles.wrapper} ${isSticky ? 'sticky' : ''}`}>
        <div className={styles.navbar}>
          {!isLogged && (
            <>
              <Button variant="contained" onClick={() => navigate('/login')} sx={{ margin: 0.5 }}>
                {t('LOGIN_LINK')}
              </Button>
              <Button variant="contained" onClick={() => navigate('/signup')} sx={{ margin: 0.5 }}>
                {t('SIGNUP_LINK')}
              </Button>
            </>
          )}
          {isLogged && (
            <>
              <p className={styles.greeting}>{`${getGreeting()}, ${name}`}</p>
              <Button variant="contained" onClick={() => navigate('/logout')} sx={{ margin: 0.5 }}>
                {t('LOGOUT_LINK')}
              </Button>
              <Button variant="contained" onClick={() => navigate('/profile')} sx={{ margin: 0.5 }}>
                {t('EDIT_PROFILE_LINK')}
              </Button>
              <Button variant="contained" onClick={() => onBoardCreate()} sx={{ margin: 0.5 }}>
                {t('CREATE_BOARD_LINK')}
              </Button>
              {pathname === '/welcome' ? (
                <Button variant="contained" onClick={() => navigate('/')} sx={{ margin: 0.5 }}>
                  {t('MAIN_PAGE_LINK')}
                </Button>
              ) : (
                <Button variant="contained" onClick={() => navigate('/welcome')} sx={{ margin: 0.5 }}>
                  {t('WELCOME_PAGE_LINK')}
                </Button>
              )}
            </>
          )}
          <LangCheckbox />
        </div>
      </div>
      <BoardCreateModal isActive={isModalActive} setIsActive={setIsModalActive} />
      <div style={{ height: '130px' }}></div>
    </>
  );
};

export default Header;

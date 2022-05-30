import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '~/hooks/redux';
import { logOut } from '~/store/reducers/authSlice';
import Loader from '../Loader';
import { useTranslation } from 'react-i18next';

import styles from './Logout.module.scss';

const Logout: FC = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      dispatch(logOut());
    }, 1000);
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div>
        <Loader />
        <p>{t('LOGOUT.MESSAGE')}</p>
      </div>
    </div>
  );
};

export default Logout;

import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { signUp, signIn, resetRegistrationStatus } from '~/store/reducers/authSlice';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader';

import styles from './SignupPage.module.scss';

const SignupPage: FC = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { isRegistered, isLoading } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      dispatch(
        signIn({
          login,
          password,
        }),
      );
      dispatch(resetRegistrationStatus());
    }
  }, [dispatch, isRegistered, login, password]);

  const updateName = (name: string) => {
    setName(name);
  };

  const updateLogin = (name: string) => {
    setLogin(name);
  };

  const updatePassword = (password: string) => {
    setPassword(password);
  };

  const onSubmit = () => {
    dispatch(
      signUp({
        name,
        login,
        password,
      }),
    );
  };

  const moveBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelText}>Имя:</span>
          <input className={styles.input} type="text" onChange={e => updateName(e.target.value)} />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Логин:</span>
          <input className={styles.input} type="text" onChange={e => updateLogin(e.target.value)} />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Пароль:</span>
          <input className={styles.input} type="password" onChange={e => updatePassword(e.target.value)} />
        </label>
        <Button variant="contained" type="submit" onClick={onSubmit} sx={{ marginTop: 2 }}>
          Зарегистрироваться
        </Button>
      </div>
      <div style={{ opacity: isLoading ? 1 : 0 }}>
        <Loader />
      </div>
      <Button variant="outlined" type="button" onClick={moveBack} sx={{ position: 'absolute', right: 25, top: 25 }}>
        ← Назад
      </Button>
    </div>
  );
};

export default SignupPage;

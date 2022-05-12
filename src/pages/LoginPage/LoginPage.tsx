import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { signIn } from '~/store/reducers/authSlice';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader';
import styles from './LoginPage.module.scss';
import { getAllUsers } from '~/services/users';
import { UserData } from '~/types/api';
import { setCurrentUser } from '~/store/reducers/currentUserSlice';

const LoginPage: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(state => state.auth);

  const updateName = (login: string) => {
    setLogin(login);
  };

  const updatePassword = (password: string) => {
    setPassword(password);
  };

  const onSubmit = async () => {
    await dispatch(
      signIn({
        login,
        password,
      }),
    );
    await setUser(login);
  };

  const setUser = async (login: string) => {
    const allUsers = (await getAllUsers()) as UserData[];
    if (allUsers) {
      dispatch(setCurrentUser((allUsers as UserData[]).find((user: UserData) => user.login === login)?.id as string));
    }
  };

  const moveBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelText}>Логин:</span>
          <input className={styles.input} type="text" onChange={e => updateName(e.target.value)} />
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Пароль:</span>
          <input className={styles.input} type="password" onChange={e => updatePassword(e.target.value)} />
        </label>
        <Button variant="contained" type="submit" onClick={onSubmit} sx={{ width: 150, marginTop: 2 }}>
          Войти
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

export default LoginPage;

import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { signIn, clearError } from '~/store/reducers/authSlice';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { LoginRequest } from '~/types/api';
import { LoginErrors } from '~/types/enums';

import styles from './LoginPage.module.scss';
import { getAllUsers } from '~/services/users';
import { UserData } from '~/types/api';
import { setCurrentUser } from '~/store/reducers/currentUserSlice';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const validate = (values: LoginRequest) => {
    const errors = {} as LoginRequest;
    if (!values.login) {
      errors.login = LoginErrors.LOGIN_REQUIRED;
    }
    if (!values.password) {
      errors.password = LoginErrors.PASSWORD_REQUIRED;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate,
    onSubmit: ({ login, password }) => {
      dispatch(
        signIn({
          login,
          password,
        }),
      );
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
  }, [dispatch, error]);

  // const onSubmit = async () => {
  //   await dispatch(
  //     signIn({
  //       login,
  //       password,
  //     }),
  //   );
  //   await setUser(login);
  // };

  // const setUser = async (login: string) => {
  //   const allUsers = (await getAllUsers()) as UserData[];
  //   if (allUsers) {
  //     dispatch(setCurrentUser((allUsers as UserData[]).find((user: UserData) => user.login === login)?.id as string));
  //   }
  // };

  const moveBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelText}>Логин:</span>
          <input
            className={styles.input}
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          {formik.errors.login ? <div className={styles.error}>{formik.errors.login}</div> : null}
        </label>
        <label className={styles.label}>
          <span className={styles.labelText}>Пароль:</span>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : null}
        </label>
        <Button variant="contained" type="submit" sx={{ width: 150, marginTop: 2 }}>
          Войти
        </Button>
      </form>
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

import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { signUp, signIn, resetRegistrationStatus, clearError } from '~/store/reducers/authSlice';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { SignUpRequest } from '~/types/api';
import { SignUpErrors } from '~/types/enums';

import styles from './SignupPage.module.scss';

const SignupPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isRegistered, isLoading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const validate = (values: SignUpRequest) => {
    const errors = {} as SignUpRequest;
    if (!values.name) {
      errors.name = SignUpErrors.NAME_REQUIRED;
    } else if (values.name.length < 2) {
      errors.name = SignUpErrors.NAME_INVALID;
    }
    if (!values.login) {
      errors.login = SignUpErrors.LOGIN_REQUIRED;
    } else if (values.login.length < 4) {
      errors.login = SignUpErrors.LOGIN_INVALID;
    }
    if (!values.password) {
      errors.password = SignUpErrors.PASSWORD_REQUIRED;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    validate,
    onSubmit: ({ name, login, password }) => {
      dispatch(
        signUp({
          name,
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

  useEffect(() => {
    if (isRegistered) {
      const { login, password } = formik.values;
      dispatch(
        signIn({
          login,
          password,
        }),
      );
      dispatch(resetRegistrationStatus());
    }
  }, [dispatch, formik, isRegistered]);

  const moveBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelText}>Имя:</span>
          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : null}
        </label>
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
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
          Зарегистрироваться
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

export default SignupPage;

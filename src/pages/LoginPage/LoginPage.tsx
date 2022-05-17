import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { signIn, clearError } from '~/store/reducers/authSlice';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import { LoginRequest } from '~/types/api';
import { useTranslation } from 'react-i18next';

import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const { lang } = useAppSelector(state => state.locale);

  const { t } = useTranslation();

  const validate = (values: LoginRequest) => {
    const errors = {} as LoginRequest;
    if (!values.login) {
      errors.login = t('LOGIN.LOGIN_REQUIRED');
    }
    if (!values.password) {
      errors.password = t('LOGIN.PASSWORD_REQUIRED');
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

  useEffect(() => {
    formik.setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const moveBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelText}>{t('LOGIN.LOGIN_LABEL')}</span>
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
          <span className={styles.labelText}>{t('LOGIN.PASSWORD_LABEL')}</span>
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
          {t('LOGIN.BUTTON_LABEL')}
        </Button>
      </form>
      <div style={{ opacity: isLoading ? 1 : 0 }}>
        <Loader />
      </div>
      <Button variant="outlined" type="button" onClick={moveBack} sx={{ position: 'absolute', right: 25, top: 25 }}>
        ← {t('BUTTON_BACK')}
      </Button>
    </div>
  );
};

export default LoginPage;

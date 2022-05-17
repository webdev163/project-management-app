import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import { SignUpRequest } from '~/types/api';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '~/components/ConfirmationModal';
import { clearError, resetIsUpdated, updateUser, logOut, setIsDeleted } from '~/store/reducers/authSlice';
import { deleteUser } from '~/services/users';

import styles from './EditProfilePage.module.scss';

const EditProfilePage: FC = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, userId, isUpdated } = useAppSelector(state => state.auth);
  const { lang } = useAppSelector(state => state.locale);

  const onModalClick = (response: boolean) => {
    setIsModalActive(false);
    if (response) {
      deleteUser(userId);
      dispatch(setIsDeleted());
      dispatch(logOut());
    }
  };

  const { t } = useTranslation();

  const validate = (values: SignUpRequest) => {
    const errors = {} as SignUpRequest;
    if (!values.name) {
      errors.name = t('SIGNUP.NAME_REQUIRED');
    } else if (values.name.length < 2) {
      errors.name = t('SIGNUP.NAME_INVALID');
    }
    if (!values.login) {
      errors.login = t('SIGNUP.LOGIN_REQUIRED');
    } else if (values.login.length < 4) {
      errors.login = t('SIGNUP.LOGIN_INVALID');
    }
    if (!values.password) {
      errors.password = t('SIGNUP.PASSWORD_REQUIRED');
    } else if (values.login.length < 6) {
      errors.password = t('SIGNUP.PASSWORD_INVALID');
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
      const id = userId;
      dispatch(
        updateUser({
          id,
          name,
          login,
          password,
        }),
      );
    },
  });

  useEffect(() => {
    isUpdated &&
      toast.success(t('EDIT_PROFILE.DONE'), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    return () => {
      dispatch(resetIsUpdated());
    };
  }, [dispatch, isUpdated, t]);

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
        <p>{t('EDIT_PROFILE.TITLE')}</p>
        <label className={styles.label}>
          <span className={styles.labelText}>{t('SIGNUP.NAME_LABEL')}</span>
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
          <span className={styles.labelText}>{t('SIGNUP.LOGIN_LABEL')}</span>
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
          <span className={styles.labelText}>{t('SIGNUP.PASSWORD_LABEL')}</span>
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
        <div className={styles.btnWrapper}>
          <Button
            variant="contained"
            sx={{
              margin: 2,
              backgroundColor: 'red',
              ':hover': {
                backgroundColor: '#e64e4e',
              },
            }}
            onClick={() => setIsModalActive(true)}
          >
            {t('BUTTON_DELETE_USER')}
          </Button>
          <Button variant="contained" type="submit" sx={{ margin: 2 }}>
            {t('BUTTON_SAVE')}
          </Button>
        </div>
      </form>
      <div style={{ opacity: isLoading ? 1 : 0 }}>
        <Loader />
      </div>
      <Button variant="outlined" type="button" onClick={moveBack} sx={{ position: 'absolute', right: 25, top: 25 }}>
        ← {t('BUTTON_BACK')}
      </Button>
      <ConfirmationModal text={t('EDIT_PROFILE.DELETE_MSG')} callback={onModalClick} isActive={isModalActive} />
    </div>
  );
};

export default EditProfilePage;

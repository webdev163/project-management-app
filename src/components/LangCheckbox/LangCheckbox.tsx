import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { toggleLang } from '~/store/reducers/langSlice';
import { useTranslation } from 'react-i18next';
import '~/locales';

import styles from './LangCheckbox.module.scss';

const LangCheckbox: FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { lang } = useAppSelector(state => state.locale);

  const handleClick = () => {
    i18n.changeLanguage(lang === 'ru' ? 'en' : 'ru');
    dispatch(toggleLang());
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <div className={styles.slide}>
      <label className={styles.labelCheckbox} htmlFor="checkbox-lang">
        EN
      </label>
      <input
        className="slide-checkbox"
        type="checkbox"
        id="checkbox-lang"
        onChange={() => handleClick()}
        checked={lang === 'ru'}
      />
      <label className="custom-checkbox" htmlFor="checkbox-lang"></label>
      <label className={styles.labelCheckbox} htmlFor="checkbox-lang">
        RU
      </label>
    </div>
  );
};

export default LangCheckbox;

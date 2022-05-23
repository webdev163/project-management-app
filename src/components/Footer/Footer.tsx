import React, { FC } from 'react';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.rsWrapper}>
          <a href="https://rs.school/js/" target="__blank">
            <img width="119" height="35" src="/assets/img/rs_school.svg" alt="" />
          </a>
        </div>
        <div className={styles.githubNames}>
          <div className={styles.githubItem}>
            <a className={styles.githubLink} href="https://www.github.com/webdev163" target="__blank">
              <img className={styles.githubImg} src="/assets/img/logo-github.svg" alt="" />
              <span className={styles.githubName}>webdev163</span>
            </a>
          </div>
          <div className={styles.githubItem}>
            <a className={styles.githubLink} href="https://www.github.com/anyacubed" target="__blank">
              <img className={styles.githubImg} src="/assets/img/logo-github.svg" alt="" />
              <span className={styles.githubName}>anyacubed</span>
            </a>
          </div>
          <div className={styles.githubItem}>
            <a className={styles.githubLink} href="https://www.github.com/alexeyzabashta" target="__blank">
              <img className={styles.githubImg} src="/assets/img/logo-github.svg" alt="" />
              <span className={styles.githubName}>alexeyzabashta</span>
            </a>
          </div>
        </div>
        <div>
          <div className={styles.copy}>© {new Date().getFullYear()}</div>
          <a className={styles.notification} href="https://www.freepik.com/" target="__blank">
            illustrations - www.freepik.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

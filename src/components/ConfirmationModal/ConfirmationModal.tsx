import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { ConfirmationModalProps } from './types';

import styles from './ConfirmationModal.module.scss';

const ConfirmationModal: FC<ConfirmationModalProps> = ({ text, callback, isActive }) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;

  const { t } = useTranslation();

  const onConfirm = () => {
    callback(true);
  };

  const onReject = () => {
    callback(false);
  };

  return createPortal(
    isActive && (
      <div className="overlay">
        <div className={styles.modal}>
          <p className={styles.text}>{text}</p>
          <div className={styles.btnWrapper}>
            <Button
              variant="contained"
              onClick={onConfirm}
              sx={{
                width: '45%',
              }}
            >
              {t('MODAL.CONFIRM_BUTTON')}
            </Button>
            <Button
              variant="outlined"
              onClick={onReject}
              sx={{
                width: '45%',
              }}
            >
              {t('MODAL.REJECT_BUTTON')}
            </Button>
          </div>
        </div>
      </div>
    ),
    modalRoot,
  );
};

export default ConfirmationModal;

import React, { FC, useRef } from 'react';
import { ModalWindowProps } from '~/types/board';
import { Button } from '@mui/material';

import styles from '../Board/Board.module.scss';

const ModalWindowForm: FC<ModalWindowProps> = props => {
  const cardInputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const handleSubmit = (): void => {
    if (cardInputRef.current?.value) {
      props.setData.setData(cardInputRef.current?.value);
      props.handleCloseModal.handleCloseModal();
    }
  };

  return (
    <div className={styles.modalInner}>
      <div className={styles.tasksItem}>
        <input
          type="text"
          placeholder={props.options.options.placeholderText}
          ref={cardInputRef}
          autoFocus
          className={styles.input}
        />
      </div>
      <div className={styles.btnWrapper}>
        <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%' }}>
          {props.options.options.btnTitle}
        </Button>
      </div>
    </div>
  );
};

export default ModalWindowForm;

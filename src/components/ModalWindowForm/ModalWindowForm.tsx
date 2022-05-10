import React, { FC, useRef } from 'react';
import { ModalWindowProps } from '~/types/board';
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
    <div>
      <div className={styles.tasksItem}>
        <input
          type="text"
          placeholder={props.options.options.placeholderText}
          ref={cardInputRef}
          autoFocus
          className={styles.input}
        />
      </div>
      <button className={styles.btn} onClick={handleSubmit}>
        {props.options.options.btnTitle}
      </button>
    </div>
  );
};

export default ModalWindowForm;

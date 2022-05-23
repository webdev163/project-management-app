import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BoardCreateModalProps } from './types';
import Button from '@mui/material/Button';
import { createBoard, getAllBoards } from '~/services/boards';
import { useAppDispatch } from '~/hooks/redux';
import { setBoards } from '~/store/reducers/boardSlice';
import { BoardData } from '~/types/api';

import styles from './BoardCreateModal.module.scss';

const BoardCreateModal: FC<BoardCreateModalProps> = ({ isActive, setIsActive }) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;

  const [boardTitle, setBoardTitle] = useState('');
  const [boardDescr, setBoardDescr] = useState('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBoardTitle(value);
  };

  const updateDescr = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBoardDescr(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createBoard(boardTitle, boardDescr);
    const boards = (await getAllBoards()) as BoardData[];
    dispatch(setBoards(boards));
    setBoardTitle('');
    setBoardDescr('');
    setIsActive(false);
  };

  return createPortal(
    isActive && (
      <div className="overlay">
        <div className={styles.modal}>
          <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <label className={styles.label}>
              <span className={styles.labelText}>{t('CREATE_BOARD.TITLE')}</span>
              <input
                className={styles.input}
                name="title"
                type="text"
                onChange={e => updateTitle(e)}
                value={boardTitle}
                required
              />
            </label>
            <label className={styles.label}>
              <span className={styles.labelText}>{t('CREATE_BOARD.DESCR')}</span>
              <textarea
                className={styles.textarea}
                name="description"
                onChange={e => updateDescr(e)}
                value={boardDescr}
                rows={5}
                required
              ></textarea>
            </label>
            <div className={styles.btnWrapper}>
              <Button variant="contained" type="submit" sx={{ width: '47%', marginTop: 2 }}>
                {t('MODAL.CREATE_BOARD_BUTTON')}
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setIsActive(false)}
                sx={{ width: '47%', marginTop: 2 }}
              >
                {t('MODAL.CANCEL_BUTTON')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    ),
    modalRoot,
  );
};

export default BoardCreateModal;

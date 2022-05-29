import React, { FC, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BoardEditModalProps } from './types';
import Button from '@mui/material/Button';
import { useAppSelector } from '~/hooks/redux';
import { BoardData } from '~/types/api';
import { getBoard, updateBoard } from '~/services/boards';

import styles from './BoardEditModal.module.scss';

const BoardEditModal: FC<BoardEditModalProps> = ({ isActive, setIsActive, boardId, setIsEdited }) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;

  const [boardTitle, setBoardTitle] = useState('');
  const [boardDescr, setBoardDescr] = useState('');

  const { t } = useTranslation();
  const { currentBoard } = useAppSelector(state => state.currentBoard);

  const getBoardData = async (boardId: string) => {
    const currentBoardData = (await getBoard(boardId)) as BoardData;
    const { title, description } = currentBoardData;
    setBoardTitle(title);
    setBoardDescr(description);
  };

  useEffect(() => {
    isActive && getBoardData(boardId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

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
    await updateBoard(currentBoard.id, boardTitle, boardDescr);
    setIsActive(false);
    setIsEdited(true);
  };

  return createPortal(
    isActive && (
      <div className="overlay">
        <div className={styles.modal}>
          <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <label className={styles.label}>
              <span className={styles.labelText}>{t('UPDATE_BOARD.TITLE')}</span>
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
              <span className={styles.labelText}>{t('UPDATE_BOARD.DESCR')}</span>
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
                {t('MODAL.UPDATE_BOARD_BUTTON')}
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

export default BoardEditModal;

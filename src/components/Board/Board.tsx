import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '~/hooks/redux';
import { getAllColumns } from '~/services/columns';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import { ColumnData, TaskData } from '~/types/api';
import BoardAddItem from '../BoardAddItem';
import BoardColumn from '../BoardColumn';
import { ModalWindowFormOptions } from '~/types/board';
import Button from '@mui/material/Button';
import Footer from '~/components/Footer';
import { clearError } from '~/store/reducers/authSlice';
import { ToastContainer, toast } from 'react-toastify';

import styles from './Board.module.scss';

const Board: FC = () => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);
  const { error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columnOptions: ModalWindowFormOptions = {
    type: 'column',
    btnTitle: t('BOARD.BUTTON_ADD_A_COLUMN'),
    placeholderText: t('BOARD.BUTTON_ADD_A_COLUMN_PLACEHOLDER'),
  };

  const moveBack = () => {
    navigate('/mainPage');
  };

  useEffect(() => {
    const getColumns = async (): Promise<void> => {
      if (currentBoard.id) {
        const columns = ((await getAllColumns(currentBoard.id)) as ColumnData[]).sort((a, b) => a.order - b.order);
        dispatch(
          setCurrentBoard({
            id: currentBoard.id,
            title: currentBoard.title,
            columns: columns as ColumnData[],
          }),
        );
      }
    };
    getColumns();
  }, [currentBoard.id, currentBoard.title, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.boardContainer}>
        <Button variant="outlined" type="button" className={styles.backBtn} onClick={moveBack}>
          ← {t('BOARD.BUTTON_BACK')}
        </Button>
        <div className={styles.board}>
          {currentBoard.columns &&
            currentBoard.columns?.map((column: ColumnData, index: number) => {
              return (
                <BoardColumn
                  key={column.id}
                  columnId={column.id}
                  columnTitle={column.title}
                  columnOrder={index}
                  columnTasks={column.tasks as TaskData[]}
                />
              );
            })}
          <BoardAddItem options={columnOptions} columnId={''} />
        </div>
        <div className="footer-wrapper">
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </DndProvider>
  );
};

export default Board;

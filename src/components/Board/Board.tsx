import React, { FC, useCallback, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';

import styles from './Board.module.scss';

const Board: FC = () => {
  const { id: currentBoardId } = useParams();
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
    navigate('/');
  };

  useEffect(() => {
    const getColumns = async (): Promise<void> => {
      if (currentBoardId) {
        const columns = await getAllColumns(currentBoardId);
        dispatch(
          setCurrentBoard({
            id: currentBoardId,
            title: currentBoard.title,
            columns: columns as ColumnData[],
          }),
        );
      }
    };
    getColumns();
  }, [currentBoardId, currentBoard.title, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const moveColumn = useCallback(
    (draggedColumnId: string, hoveredColumnId: string): void => {
      if (currentBoard.columns) {
        const draggedColumn = currentBoard.columns.find(column => column.id === draggedColumnId);
        const hoveredColumn = currentBoard.columns.find(column => column.id === hoveredColumnId);

        if (draggedColumn && hoveredColumn) {
          const dragItemIndex = currentBoard.columns.indexOf(draggedColumn);
          const hoverItemIndex = currentBoard.columns.indexOf(hoveredColumn);
          const updatedColumns = [...currentBoard.columns];
          updatedColumns[dragItemIndex] = hoveredColumn;
          updatedColumns[hoverItemIndex] = draggedColumn;
          dispatch(
            setCurrentBoard({
              id: currentBoardId as string,
              title: currentBoard.title,
              columns: updatedColumns,
            }),
          );
        }
      }
    },
    [currentBoard.columns, currentBoardId, currentBoard.title, dispatch],
  );

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
                  moveColumn={moveColumn}
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

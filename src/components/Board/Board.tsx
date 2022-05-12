import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks/redux';
import { getAllColumns } from '~/services/columns';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import { ColumnData, TaskData } from '~/types/api';
import { columnOptions } from '~/utils/constants';
import BoardAddItem from '../BoardAddItem';
import BoardColumn from '../BoardColumn';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Board.module.scss';

const Board: FC = () => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const moveBack = () => {
    navigate('/mainPage');
  };

  useEffect(() => {
    const getColumns = async (): Promise<void> => {
      if (currentBoard.id) {
        const columns = await getAllColumns(currentBoard.id);
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

  return (
    <div className={styles.boardContainer}>
      <Button variant="outlined" type="button" onClick={moveBack} sx={{ margin: '10px' }}>
        ← Назад
      </Button>
      <div className={styles.board}>
        {currentBoard.columns &&
          currentBoard.columns?.map((column: ColumnData) => {
            return (
              <BoardColumn
                key={column.id}
                columnId={column.id}
                columnTitle={column.title}
                columnOrder={column.order}
                columnTasks={column.tasks as TaskData[]}
              />
            );
          })}
        <BoardAddItem options={columnOptions} columnId={''} />
      </div>
    </div>
  );
};

export default Board;

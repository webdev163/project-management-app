import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks/redux';
import { getAllColumns } from '~/services/columns';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import { ColumnData, TaskData } from '~/types/api';
import { columnOptions } from '~/utils/constants';
import BoardAddItem from '../BoardAddItem';
import BoardColumn from '../BoardColumn';
import styles from './Board.module.scss';

const Board: FC = () => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);
  const dispatch = useAppDispatch();

  const getColumns = async () => {
    if (currentBoard.id) {
      const data = await getAllColumns(currentBoard.id);
      dispatch(setCurrentBoard({ id: currentBoard.id, title: currentBoard.title, columns: data as ColumnData[] }));
    }
  };

  useEffect(() => {
    getColumns();
  }, []);

  return (
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
      <BoardAddItem options={columnOptions} />
    </div>
  );
};

export default Board;

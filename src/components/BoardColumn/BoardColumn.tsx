import React, { FC, useEffect } from 'react';
import BoardTask from '../BoardTask';
import BoardAddItem from '../BoardAddItem';
import { handleFocus } from '~/utils/utils';
import styles from '../Board/Board.module.scss';
import { BoardColumnProps } from '~/types/board';
import { taskOptions } from '~/utils/constants';
import { getAllTasks } from '~/services/tasks';
import { TaskData } from '~/types/api';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setColumnTaskData } from '~/store/reducers/currentBoardSlice';

const BoardColumn: FC<BoardColumnProps> = props => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);

  const dispatch = useAppDispatch();

  const getTasks = async (): Promise<void> => {
    if (currentBoard && props.columnId) {
      const data = await getAllTasks(currentBoard.id, props.columnId);
      dispatch(
        setColumnTaskData({
          columnId: props.columnId,
          tasks: data as TaskData[],
        }),
      );
    }
  };

  const handleDeleteColumn = (): void => {
    // request delete column
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className={styles.boardItem}>
      <i className={styles.deleteBtn} onClick={handleDeleteColumn}>
        ×
      </i>
      <textarea
        className={`${styles.textarea} ${styles.columnTitle}`}
        defaultValue={props.columnTitle}
        onFocus={handleFocus}
      ></textarea>
      {props.columnTasks &&
        props.columnTasks.map((task: TaskData) => {
          return (
            <BoardTask
              id={task.id}
              key={task.id}
              title={task.title}
              columnId={task.columnId}
              description={task.description}
              order={task.order}
              userId={task.userId}
              boardId={task.boardId}
            />
          );
        })}
      <BoardAddItem options={taskOptions} />
    </div>
  );
};

export default BoardColumn;

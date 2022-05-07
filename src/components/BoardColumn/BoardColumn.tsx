import React, { FC } from 'react';
import { BoardColumnProps } from '~/interfaces/interfaces';
import BoardTask from '../BoardTask';
import dataAPI from '~/services/boardService';
import BoardAddTaskCard from '../BoardAddItem';
import { handleFocus, taskOptions } from '~/utils/utils';
import styles from '../Board/Board.module.scss';

const BoardColumn: FC<BoardColumnProps> = ({ id, title }: BoardColumnProps) => {
  const tasks = dataAPI.useGetTasksQuery({
    columnId: id,
    boardId: '0456c79b-38bf-4f66-9c51-1ccde5f154f9',
  }).currentData;

  const handleDeleteColumn = () => {
    // request delete column
  };

  return (
    <div className={styles.boardItem}>
      <i className={styles.deleteBtn} onClick={handleDeleteColumn}>
        ×
      </i>
      <textarea className={`${styles.textarea} ${styles.columnTitle}`} onFocus={handleFocus}>
        {title}
      </textarea>
      {tasks &&
        tasks.map(task => {
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
      <BoardAddTaskCard options={taskOptions} />
    </div>
  );
};

export default BoardColumn;

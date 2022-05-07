import React, { FC } from 'react';
import { BoardTaskProps } from '~/interfaces/interfaces';
import { handleFocus } from '~/utils/utils';
import styles from '../Board/Board.module.scss';

const BoardTask: FC<BoardTaskProps> = ({
  id,
  title,
  description,
  order,
  columnId,
  userId,
  boardId,
}: BoardTaskProps) => {
  return (
    <>
      <div className={styles.tasksItem}>
        <textarea className={`${styles.taskTitle} ${styles.textarea}`} onFocus={handleFocus}>
          {title}
        </textarea>
      </div>
    </>
  );
};

export default BoardTask;

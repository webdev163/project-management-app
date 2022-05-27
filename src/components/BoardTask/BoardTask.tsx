import React, { FC, useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { TaskData } from '~/types/api';
import { BoardTaskProps } from '~/types/board';
import { ItemTypes } from '~/utils/constants';
import { handleFocus } from '~/utils/utils';
import TaskEditModal from '../TaskEditModal';
import { updateTask } from '~/services/tasks';
import { useAppSelector } from '~/hooks/redux';

import styles from '../Board/Board.module.scss';

const BoardTask: FC<BoardTaskProps> = ({
  title,
  columnId,
  id,
  order,
  description,
  userId,
  setHoveredTaskId,
}: BoardTaskProps) => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);
  const [isModalActive, setIsModalActive] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: {
      id: id,
      columnId: columnId,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item: TaskData, monitor) {
      if (!taskRef.current) {
        return;
      }

      const draggedTaskId: string | undefined = item.id;
      const hoveredTaskId: string | undefined = id;

      const hoveredRect: DOMRect = taskRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition: XYCoord | null = monitor.getClientOffset();
      const hoverClientY: number = (mousePosition as XYCoord)?.y - hoveredRect.top;

      if (draggedTaskId < hoveredTaskId && hoverClientY < hoverMiddleY) return;
      if (draggedTaskId > hoveredTaskId && hoverClientY > hoverMiddleY) return;

      if (setHoveredTaskId) {
        if (hoveredTaskId) {
          setHoveredTaskId(hoveredTaskId);
        }
      }
    },
  });

  const taskRef = useRef<HTMLDivElement>(null);
  drag(drop(taskRef));

  const updateTaskTitle = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value) {
      await updateTask(currentBoard.id, columnId, columnId, id, value, order, description, userId);
      setTaskTitle(value);
    }
  };

  return (
    <div
      className={styles.tasksItem}
      ref={taskRef}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
    >
      <textarea
        className={`${styles.taskTitle} ${styles.textarea}`}
        onFocus={handleFocus}
        onChange={e => updateTaskTitle(e)}
        value={taskTitle}
      ></textarea>
      <button className={styles.editBtn} onClick={() => setIsModalActive(true)}></button>
      <TaskEditModal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        setTaskTitleProp={setTaskTitle}
        columnId={columnId}
        taskId={id}
      />
    </div>
  );
};

export default BoardTask;

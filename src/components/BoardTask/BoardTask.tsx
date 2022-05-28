import React, { FC, useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { TaskData } from '~/types/api';
import { BoardTaskProps } from '~/types/board';
import { ItemTypes } from '~/utils/constants';
import { handleFocus } from '~/utils/utils';
import TaskEditModal from '../TaskEditModal';
import { deleteTask, updateTask } from '~/services/tasks';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ConfirmationModal from '../ConfirmationModal';
import { useTranslation } from 'react-i18next';
import { setDeleteTask } from '~/store/reducers/currentBoardSlice';

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
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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

  const handleDeleteTask = async (resp: boolean): Promise<void> => {
    if (resp) {
      await deleteTask(currentBoard.id, columnId, id);
      dispatch(
        setDeleteTask({
          columnId: columnId,
          taskId: id,
        }),
      );
    }
    setIsDeleteModalActive(false);
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
      <BackspaceIcon color="error" className={styles.deleteIcon} onClick={() => setIsDeleteModalActive(true)} />
      <TaskEditModal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        setTaskTitleProp={setTaskTitle}
        columnId={columnId}
        taskId={id}
      />
      <ConfirmationModal
        callback={handleDeleteTask}
        text={t('BOARD.DELETE_TASK_MESSAGE')}
        isActive={isDeleteModalActive}
      />
    </div>
  );
};

export default BoardTask;

import React, { FC, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import BoardTask from '../BoardTask';
import BoardAddItem from '../BoardAddItem';
import { handleFocus } from '~/utils/utils';
import { BoardColumnProps, ModalWindowFormOptions } from '~/types/board';
import { ItemTypes } from '~/utils/constants';
import { getAllTasks, updateTask } from '~/services/tasks';
import { ColumnData, TaskData } from '~/types/api';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setColumnTaskData, setCurrentBoard, setDeleteColumn } from '~/store/reducers/currentBoardSlice';
import { deleteColumn } from '~/services/columns';

import styles from '../Board/Board.module.scss';

const BoardColumn: FC<BoardColumnProps> = props => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);
  const [hoveredTaskId, setHoveredTaskId] = useState('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const taskOptions: ModalWindowFormOptions = {
    type: 'task',
    btnTitle: t('BOARD.BUTTON_ADD_A_TASK'),
    placeholderText: t('BOARD.BUTTON_ADD_A_TASK_PLACEHOLDER'),
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.COLUMN, ItemTypes.TASK],
    drop(item: TaskData) {
      const draggedTaskId: string | undefined = item.id;
      const draggedTaskColumnId: string | undefined = item.columnId;
      const columnToDropId: string | undefined = props.columnId;

      if (columnToDropId) {
        changeTaskColumn(draggedTaskId, draggedTaskColumnId, columnToDropId);
        item.columnId = columnToDropId;
      }
    },
    // drop(item: ColumnData) {
    //   if (currentBoard.columns) {
    //     const draggedColumnId: string | undefined = item.id;
    //     const hoveredColumnId: string | undefined = props.columnId;
    //     const draggedColumn = currentBoard.columns.find(column => column.id === draggedColumnId);
    //     const hoveredColumn = currentBoard.columns.find(column => column.id === hoveredColumnId);

    //     if (draggedColumn && hoveredColumn) {
    //       const dragItemIndex = currentBoard.columns.indexOf(draggedColumn);
    //       const hoverItemIndex = currentBoard.columns.indexOf(hoveredColumn);
    //       const updatedColumns = [...currentBoard.columns];
    //       updatedColumns[dragItemIndex] = hoveredColumn;
    //       updatedColumns[hoverItemIndex] = draggedColumn;
    //       dispatch(
    //         setCurrentBoard({
    //           id: currentBoard.id,
    //           title: currentBoard.title,
    //           columns: updatedColumns,
    //         }),
    //       );
    //       // add columns update on api
    //     }
    //   }
    // },
    // hover(item: ColumnData, monitor) {
    //   if (!ref.current) {
    //     return;
    //   }
    //   const draggedColumnId: string | undefined = item.id;
    //   const hoveredColumnId: string | undefined = props.columnId;

    //   const hoveredRect: DOMRect | undefined = ref.current?.getBoundingClientRect();
    //   if (hoveredRect) {
    //     const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
    //     const mousePosition: XYCoord | null = monitor.getClientOffset();
    //     if (mousePosition) {
    //       const hoverActualY: number = mousePosition?.y - hoveredRect.top;

    //       if (draggedColumnId < hoveredColumnId && hoverActualY < hoverMiddleY) return;

    //       if (draggedColumnId > hoveredColumnId && hoverActualY < hoverMiddleY) return;
    //     }
    //   }

    //   props.moveColumn(draggedColumnId, hoveredColumnId);
    //   item.id = hoveredColumnId;
    // },
  });

  const ref = useRef<HTMLDivElement>(null);
  drag(drop(ref));

  const changeTaskColumn = (draggedTaskId: string, draggedTaskColumnId: string, columnToDropId: string): void => {
    const getTasks = async (): Promise<void> => {
      if (currentBoard.id && draggedTaskColumnId) {
        const draggedTask = ((await getAllTasks(currentBoard.id, draggedTaskColumnId)) as TaskData[]).filter(
          task => task.id === draggedTaskId,
        );
        if (draggedTaskColumnId === columnToDropId && hoveredTaskId) {
          const getOrder = async (): Promise<void> => {
            const hoveredTask = ((await getAllTasks(currentBoard.id, draggedTaskColumnId)) as TaskData[]).find(
              task => task.id === hoveredTaskId,
            );
            if (hoveredTask) {
              swapTasks(draggedTask[0], draggedTaskColumnId, hoveredTask);
            }
          };
          getOrder();
        } else {
          draggedTask[0].columnId = columnToDropId;
          dispatch(
            setColumnTaskData({
              columnId: props.columnId,
              tasks: [draggedTask[0], ...props.columnTasks],
            }),
          );
          handleUpdateTask(draggedTask[0], draggedTaskColumnId, columnToDropId);
        }
      }
    };
    getTasks();
  };

  const handleUpdateTask = async (
    draggedTask: TaskData,
    dragColumnIndex: string,
    columnToDropId: string,
  ): Promise<void> => {
    await updateTask(
      currentBoard.id,
      dragColumnIndex,
      columnToDropId,
      draggedTask.id,
      draggedTask.title,
      1,
      draggedTask.description,
      draggedTask.userId,
    );
    const updatedTasks = await getAllTasks(currentBoard.id, dragColumnIndex);
    dispatch(
      setColumnTaskData({
        columnId: dragColumnIndex,
        tasks: updatedTasks as TaskData[],
      }),
    );
  };

  const swapTasks = (draggedTask: TaskData, draggedTaskColumnId: string, hoveredTask: TaskData): void => {
    if (draggedTask && hoveredTask && currentBoard.columns) {
      const updatedTasks = [
        ...(currentBoard.columns.find(column => column.id === draggedTaskColumnId)?.tasks as TaskData[]),
      ];
      const draggedTaskIndex = updatedTasks.findIndex(el => el.id === draggedTask.id);
      const hoveredTaskIndex = updatedTasks.findIndex(el => el.id === hoveredTask.id);
      if (updatedTasks) {
        updatedTasks[draggedTaskIndex] = hoveredTask;
        updatedTasks[hoveredTaskIndex] = draggedTask;

        dispatch(
          setColumnTaskData({
            columnId: draggedTaskColumnId,
            tasks: updatedTasks as TaskData[],
          }),
        );
      }

      const updateSwappedTask = async (): Promise<void> => {
        await updateTask(
          currentBoard.id,
          draggedTaskColumnId,
          draggedTaskColumnId,
          draggedTask.id,
          draggedTask.title,
          hoveredTask.order,
          draggedTask.description,
          draggedTask.userId,
        );
      };
      updateSwappedTask();
    }
  };

  const handleDeleteColumn = async (): Promise<void> => {
    await deleteColumn(currentBoard.id, props.columnId);
    dispatch(
      setDeleteColumn({
        columnId: props.columnId,
        tasks: props.columnTasks,
      }),
    );
  };

  useEffect(() => {
    const getTasks = async (): Promise<void> => {
      if (currentBoard.id && props.columnId) {
        const data = await getAllTasks(currentBoard.id, props.columnId);
        dispatch(
          setColumnTaskData({
            columnId: props.columnId,
            tasks: data as TaskData[],
          }),
        );
      }
    };
    getTasks();
  }, [currentBoard.id, dispatch, props.columnId]);

  return (
    <div
      className={styles.boardItem}
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
    >
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
              setHoveredTaskId={setHoveredTaskId}
            />
          );
        })}
      <BoardAddItem options={taskOptions} columnId={props.columnId} />
    </div>
  );
};

export default BoardColumn;

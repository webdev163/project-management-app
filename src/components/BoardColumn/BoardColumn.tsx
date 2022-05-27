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
import { deleteColumn, getAllColumns, updateColumn } from '~/services/columns';

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

  function isTask(x: ColumnData | TaskData): x is TaskData {
    return (x as TaskData).columnId !== undefined;
  }

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.COLUMN, ItemTypes.TASK],
    drop(item: TaskData | ColumnData) {
      if (isTask(item)) {
        const draggedTaskId: string | undefined = item.id;
        const draggedTaskColumnId: string | undefined = item.columnId;
        const columnToDropId: string | undefined = props.columnId;

        if (columnToDropId) {
          changeTaskColumn(draggedTaskId, draggedTaskColumnId, columnToDropId);
          item.columnId = columnToDropId;
        }
      } else {
        if (currentBoard.columns) {
          const draggedColumnId: string | undefined = item.id;
          const hoveredColumnId: string | undefined = props.columnId;
          const draggedColumn = currentBoard.columns.find(column => column.id === draggedColumnId);
          const hoveredColumn = currentBoard.columns.find(column => column.id === hoveredColumnId);

          if (draggedColumn && hoveredColumn) {
            const handleUpdateColumn = async (
              draggedColumnId: string,
              draggedColumn: ColumnData,
              hoveredColumn: ColumnData,
            ): Promise<void> => {
              await updateColumn(currentBoard.id, draggedColumnId, draggedColumn.title, hoveredColumn.order);
              await updateColumn(currentBoard.id, hoveredColumnId, hoveredColumn.title, draggedColumn.order);
              const updatedColumns = ((await getAllColumns(currentBoard.id)) as ColumnData[]).sort(
                (a, b) => a.order - b.order,
              );
              updatedColumns.forEach((col: ColumnData) => {
                const updateTasks = async () => {
                  const updatedTasks = ((await getAllTasks(currentBoard.id, col.id)) as TaskData[]).sort(
                    (a, b) => a.order - b.order,
                  );
                  dispatch(
                    setColumnTaskData({
                      columnId: col.id,
                      tasks: updatedTasks,
                    }),
                  );
                };
                updateTasks();
              });
              dispatch(
                setCurrentBoard({
                  id: currentBoard.id,
                  title: currentBoard.title,
                  columns: updatedColumns as ColumnData[],
                }),
              );
            };
            handleUpdateColumn(draggedColumnId, draggedColumn, hoveredColumn);
          }
        }
      }
    },
    hover(item: ColumnData, monitor) {
      monitor.canDrop();
      if (!ref.current) {
        return;
      }
      const draggedColumnId: string | undefined = item.id;
      const hoveredColumnId: string | undefined = props.columnId;

      const hoveredRect: DOMRect | undefined = ref.current?.getBoundingClientRect();
      if (hoveredRect) {
        const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
        const mousePosition: XYCoord | null = monitor.getClientOffset();
        if (mousePosition) {
          const hoverActualY: number = mousePosition?.y - hoveredRect.top;

          if (draggedColumnId < hoveredColumnId && hoverActualY < hoverMiddleY) return;

          if (draggedColumnId > hoveredColumnId && hoverActualY < hoverMiddleY) return;
        }
      }
      if (!isTask(item)) {
        item.id = hoveredColumnId;
      }
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  drag(drop(ref));

  const changeTaskColumn = (draggedTaskId: string, draggedTaskColumnId: string, columnToDropId: string): void => {
    const getTasks = async (): Promise<void> => {
      if (currentBoard.id && draggedTaskColumnId) {
        const draggedTask = ((await getAllTasks(currentBoard.id, draggedTaskColumnId)) as TaskData[]).filter(
          task => task.id === draggedTaskId,
        );
        if (draggedTask[0]) {
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
            if (draggedTask[0]) {
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
    const updatedTasks = ((await getAllTasks(currentBoard.id, dragColumnIndex)) as TaskData[]).sort(
      (a, b) => a.order - b.order,
    );
    dispatch(
      setColumnTaskData({
        columnId: dragColumnIndex,
        tasks: updatedTasks as TaskData[],
      }),
    );
  };

  const swapTasks = async (
    draggedTask: TaskData,
    draggedTaskColumnId: string,
    hoveredTask: TaskData,
  ): Promise<void> => {
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
    await updateTask(
      currentBoard.id,
      draggedTaskColumnId,
      draggedTaskColumnId,
      hoveredTask.id,
      hoveredTask.title,
      draggedTask.order,
      hoveredTask.description,
      hoveredTask.userId,
    );
    const updatedTasks = ((await getAllTasks(currentBoard.id, draggedTaskColumnId)) as ColumnData[]).sort(
      (a, b) => a.order - b.order,
    );
    dispatch(
      setColumnTaskData({
        columnId: draggedTaskColumnId,
        tasks: updatedTasks as TaskData[],
      }),
    );
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
        const data = ((await getAllTasks(currentBoard.id, props.columnId)) as TaskData[]).sort(
          (a, b) => a.order - b.order,
        );
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

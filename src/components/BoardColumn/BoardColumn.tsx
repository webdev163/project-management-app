import React, { FC, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import BoardTask from '../BoardTask';
import BoardAddItem from '../BoardAddItem';
import { BoardColumnProps, ModalWindowFormOptions } from '~/types/board';
import { ItemTypes } from '~/utils/constants';
import { getAllTasks, updateTask } from '~/services/tasks';
import { ColumnData, TaskData } from '~/types/api';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setColumn, setColumnTaskData, setCurrentBoard, setDeleteColumn } from '~/store/reducers/currentBoardSlice';
import { deleteColumn, getAllColumns, updateColumn, getColumn } from '~/services/columns';
import ConfirmationModal from '../ConfirmationModal';

import styles from '../Board/Board.module.scss';

const BoardColumn: FC<BoardColumnProps> = props => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);
  const [hoveredTaskId, setHoveredTaskId] = useState('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);
  const [isTitleOnClick, setIsTitleOnClick] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(props.columnTitle);
  const columnTitleInputContainerRef = React.useRef<HTMLDivElement>(null);

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
                  description: currentBoard.description,
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
                  tasks: [...props.columnTasks, draggedTask[0]],
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
    const targetColumnData = (await getColumn(currentBoard.id, columnToDropId)) as ColumnData;
    const order = (targetColumnData?.tasks?.length as number) + 1;
    await updateTask(
      currentBoard.id,
      dragColumnIndex,
      columnToDropId,
      draggedTask.id,
      draggedTask.title,
      order,
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

  const handleDeleteColumn = async (resp: boolean): Promise<void> => {
    if (resp) {
      await deleteColumn(currentBoard.id, props.columnId);
      dispatch(
        setDeleteColumn({
          columnId: props.columnId,
          tasks: props.columnTasks,
        }),
      );
    }
    setIsModalActive(false);
  };

  const updateColumnTitle = async () => {
    if (newColumnTitle && newColumnTitle !== props.columnTitle) {
      await updateColumn(currentBoard.id, props.columnId, newColumnTitle, props.columnOrder);
      dispatch(
        setColumn({
          columnId: props.columnId,
          title: newColumnTitle,
        }),
      );
    }
    setIsTitleOnClick(false);
  };

  const useOutsideAlerter = () => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          columnTitleInputContainerRef.current &&
          !columnTitleInputContainerRef.current.contains(event.target as Node)
        ) {
          setIsTitleOnClick(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  };

  useOutsideAlerter();

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
      <span className={styles.deleteBtn} onClick={() => setIsModalActive(true)}>
        ×
      </span>
      {isTitleOnClick ? (
        <div className={styles.columnTitleInputContainer} ref={columnTitleInputContainerRef}>
          <input
            type="text"
            className={styles.columnTitleInput}
            defaultValue={props.columnTitle}
            autoFocus
            onChange={e => setNewColumnTitle(e.target.value)}
          />
          <div className={styles.columnTitleInputBtnsContainer}>
            <button
              onClick={() => {
                updateColumnTitle();
              }}
            >
              Submit
            </button>
            <button onClick={() => setIsTitleOnClick(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={`${styles.textarea} ${styles.columnTitle}`} onClick={() => setIsTitleOnClick(true)}>
          {props.columnTitle}
        </div>
      )}
      <div className={styles.tasksContainer}>
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
      </div>
      <BoardAddItem options={taskOptions} columnId={props.columnId} />
      <ConfirmationModal
        callback={handleDeleteColumn}
        text={t('BOARD.DELETE_COLUMN_MESSAGE')}
        isActive={isModalActive}
      />
    </div>
  );
};

export default BoardColumn;

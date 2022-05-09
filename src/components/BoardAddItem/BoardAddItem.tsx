import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import ModalWindowForm from '../ModalWindowForm/ModalWindowForm';
import styles from '../Board/Board.module.scss';
import BoardTask from '../BoardTask';
import BoardColumn from '../BoardColumn';
import { ModalWindowFormProps } from '~/types/board';
import { createColumn } from '~/services/columns';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import { ColumnData } from '~/types/api';
import { createTask } from '~/services/tasks';

const BoardAddItem: FC<ModalWindowFormProps> = props => {
  const { currentBoard } = useAppSelector(state => state.currentBoard);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(): void {
    setIsModalOpen(true);
  }

  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  const setData = (data: string): void => {
    if (props.options.type === 'column') {
      // request create new column
      createNewColumn(data);
    }

    if (props.options.type === 'task') {
      console.log(data);
      // request create new task
    }
  };

  const createNewColumn = async (newColumnTitle: string) => {
    const data = await createColumn(currentBoard.id, newColumnTitle, (currentBoard.columns?.length as number) + 1);
    dispatch(
      setCurrentBoard({
        id: currentBoard.id,
        title: currentBoard.title,
        columns: [...(currentBoard.columns || []), data as ColumnData],
      }),
    );
    return data;
  };

  // const createNewTask = async (newTaskTitle: string) => {
  //   const data = await createTask(currentBoard.id, columnId, newTaskTitle, order, description, userId);
  //   dispatch(
  //     setCurrentBoard({
  //       id: currentBoard.id,
  //       title: currentBoard.title,
  //       columns: [...(currentBoard.columns || []), data as ColumnData],
  //     }),
  //   );
  //   return data;
  // };

  return (
    <>
      <Modal
        className={styles.modalForm}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick
      >
        <ModalWindowForm
          options={{ options: props.options }}
          setData={{ setData: setData }}
          handleCloseModal={{
            handleCloseModal: handleCloseModal,
          }}
        />
        <i className={`${styles.cancelBtn} ${styles.modalCloseBtn}`} onClick={handleCloseModal}>
          ×
        </i>
      </Modal>
      {/* {!isModalOpen && newTask && (
        // <div className={styles.tasksItem}>
        //   <textarea className={`${styles.taskTitle} ${styles.textarea}`}>{newTask}</textarea>
        // </div>
        <BoardTask key={''} id={''} title={newTask} order={0} description={''} userId={''} boardId={''} columnId={''} />
      )} */}
      {!isModalOpen && (
        <button className={styles.btn} onClick={handleOpenModal}>
          {props.options.btnTitle}
        </button>
      )}
    </>
  );
};

export default BoardAddItem;

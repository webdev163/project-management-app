import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import ModalWindowForm from '../ModalWindowForm/ModalWindowForm';
import styles from '../Board/Board.module.scss';
import { ModalWindowFormProps } from '~/interfaces/interfaces';
import BoardTask from '../BoardTask';
import BoardColumn from '../BoardColumn';

const BoardAddItem: FC<ModalWindowFormProps> = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumn, setNewColumn] = useState('');
  const [newTask, setNewTask] = useState('');

  function handleOpenModal(): void {
    setIsModalOpen(true);
    setNewColumn('');
    setNewTask('');
  }

  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  const setData = (data: string): void => {
    console.log(data);
    if (props.options.type === 'column') {
      setNewColumn(data);
      console.log('new column ', newColumn);
      // request create new column
    }

    if (props.options.type === 'task') {
      setNewTask(data);
      console.log('new task', newTask);
      // request create new task
    }
  };

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
      )}
      {!isModalOpen && newColumn && <BoardColumn key={''} title={newColumn} id={''} />} */}
      {(!isModalOpen || props.options.type !== 'task') && (
        <button className={styles.btn} onClick={handleOpenModal}>
          {props.options.btnTitle}
        </button>
      )}
    </>
  );
};

export default BoardAddItem;

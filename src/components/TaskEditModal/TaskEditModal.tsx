import React, { FC, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { TaskEditModalProps } from './types';
import Button from '@mui/material/Button';
import { useAppSelector } from '~/hooks/redux';
import { TaskData, UserData } from '~/types/api';
import { getTask, updateTask } from '~/services/tasks';
import { getAllUsers } from '~/services/users';

import styles from './TaskEditModal.module.scss';

const TaskEditModal: FC<TaskEditModalProps> = ({ isActive, setIsActive, setTaskTitleProp, columnId, taskId }) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescr, setTaskDescr] = useState('');
  const [taskUser, setTaskUser] = useState('');
  const [taskOrder, setTaskOrder] = useState(0);
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [taskData, setTaskData] = useState<TaskData | null>(null);

  const { t } = useTranslation();
  const { currentBoard } = useAppSelector(state => state.currentBoard);

  const getTaskData = async (boardId: string, columnId: string, taskId: string) => {
    const currentTaskData = (await getTask(boardId, columnId, taskId)) as TaskData;
    setTaskData(currentTaskData);
    const { title, description, order } = currentTaskData;
    setTaskTitle(title);
    setTaskOrder(order);
    description !== 'description' && setTaskDescr(description);
    const users = (await getAllUsers()) as UserData[];
    setUsersData(users);
  };

  useEffect(() => {
    isActive && getTaskData(currentBoard.id, columnId, taskId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (usersData.length > 0 && taskData) {
      usersData.forEach(el => {
        if (el.id === taskData.userId) {
          setTaskUser(el.id);
        }
      });
    }
  }, [usersData, taskData]);

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaskTitle(value);
  };

  const updateDescr = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTaskDescr(value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTaskUser(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTask(currentBoard.id, columnId, columnId, taskId, taskTitle, taskOrder, taskDescr, taskUser);
    setIsActive(false);
    setTaskTitleProp(taskTitle);
  };

  return createPortal(
    isActive && (
      <div className="overlay">
        <div className={styles.modal}>
          <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <label className={styles.label}>
              <span className={styles.labelText}>{t('UPDATE_TASK.TITLE')}</span>
              <input
                className={styles.input}
                name="title"
                type="text"
                onChange={e => updateTitle(e)}
                value={taskTitle}
                required
              />
            </label>
            <label className={styles.label}>
              <span className={styles.labelText}>{t('UPDATE_TASK.DESCR')}</span>
              <textarea
                className={styles.textarea}
                name="description"
                onChange={e => updateDescr(e)}
                value={taskDescr}
                rows={5}
                required
              ></textarea>
            </label>
            <label className={styles.label}>
              <span className={styles.labelText}>{t('UPDATE_TASK.USER')}</span>
              <select className={styles.select} value={taskUser} onChange={handleSelect}>
                {usersData.map(el => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.login}
                    </option>
                  );
                })}
              </select>
            </label>
            <div className={styles.btnWrapper}>
              <Button variant="contained" type="submit" sx={{ width: '47%', marginTop: 2 }}>
                {t('MODAL.UPDATE_TASK_BUTTON')}
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setIsActive(false)}
                sx={{ width: '47%', marginTop: 2 }}
              >
                {t('MODAL.CANCEL_BUTTON')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    ),
    modalRoot,
  );
};

export default TaskEditModal;

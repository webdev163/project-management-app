import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { getAllBoards } from '~/services/boards';
import { setBoards } from '~/store/reducers/boardSlice';
import { getBoard } from '~/services/boards';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import { BoardData } from '~/types/api';
import { List, ListItem } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useTranslation } from 'react-i18next';
import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const { boards } = useAppSelector(state => state.boards);
  const { isLogged } = useAppSelector(state => state.auth);
  const [countArr, setCountArr] = useState<BoardData[]>([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const openBoard = (boardId: string): void => {
    dispatch(setCurrentBoard(boards.find(board => board.id === boardId) as BoardData));
  };

  const deleteBoard = (boardId: string) => {
    dispatch(setBoards(boards.filter(board => board.id !== boardId)));
  };

  const tasksCount = (board: BoardData) => {
    const boardToCount = countArr.find(item => board.id === item.id) as BoardData;
    const columns = boardToCount?.columns?.length || 0;
    let tasksNumber = 0;
    columns
      ? boardToCount.columns?.forEach(item => {
          if (item.tasks) {
            tasksNumber += item.tasks.length;
          }
        })
      : 0;
    return { columns, tasksNumber };
  };

  useEffect(() => {
    if (isLogged) {
      const getBoards = async (): Promise<void> => {
        const data = await getAllBoards();
        if (Array.isArray(data)) {
          dispatch(setBoards(data as BoardData[]));
          const arr = await Promise.all(data.map(async item => await getBoard(item.id)));
          const arrFilter = arr.filter(item => item !== undefined) as BoardData[];
          setCountArr(arrFilter ? [...arrFilter] : []);
        }
      };
      getBoards();
    }
  }, [dispatch, isLogged]);

  return (
    <div className={styles.mainPage}>
      <div className={styles.main_route_sidebar}>
        <NavLink to="/board" className={`${styles.board} ${styles.boardDefaulted}`}>
          <p>{t('MAIN_ROUTE.CREATE_BOARD')}</p>
        </NavLink>
        {Array.isArray(boards) && (
          <List>
            {boards.map((board: BoardData) => {
              return (
                <ListItem key={board.id} onClick={() => openBoard(board.id)} className={styles.boardWrapper}>
                  <NavLink to="board" className={styles.board}>
                    {countArr && (
                      <List>
                        <ListItem>{board.title}</ListItem>
                        <ListItem>
                          {t('MAIN_ROUTE.COLUMNS_COUNT')} {tasksCount(board).columns}
                        </ListItem>
                        <ListItem>
                          {t('MAIN_ROUTE.TASKS_COUNT')} {tasksCount(board).tasksNumber}
                        </ListItem>
                      </List>
                    )}
                  </NavLink>
                  <div className={styles.deleteIcon_wrapper}>
                    <BackspaceIcon color="error" className={styles.deleteIcon} onClick={() => deleteBoard(board.id)} />
                  </div>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
    </div>
  );
};

export default MainPage;

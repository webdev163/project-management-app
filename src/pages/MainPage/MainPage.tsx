import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { getAllBoards } from '~/services/boards';
import { setBoards } from '~/store/reducers/boardSlice';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import { BoardData } from '~/types/api';

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const { boards } = useAppSelector(state => state.boards);
  const { isLogged } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const openBoard = (boardId: string): void => {
    dispatch(setCurrentBoard(boards.find(board => board.id === boardId) as BoardData));
  };

  useEffect(() => {
    if (isLogged) {
      const getBoards = async (): Promise<void> => {
        const data = await getAllBoards();
        if (Array.isArray(data)) {
          dispatch(setBoards(data as BoardData[]));
        }
      };
      getBoards();
    }
  }, [dispatch, isLogged]);

  return (
    <div className={styles.mainPage}>
      <NavLink to="/board" className={`${styles.board} ${styles.boardDefaulted}`}>
        <p>Создать доску</p>
      </NavLink>
      {Array.isArray(boards) &&
        boards.map((board: BoardData) => {
          return (
            <div key={board.id} onClick={() => openBoard(board.id)}>
              <NavLink to="board" className={styles.board}>
                <p>{board.title}</p>
              </NavLink>
            </div>
          );
        })}
    </div>
  );
};

export default MainPage;

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
  const dispatch = useAppDispatch();

  const getBoards = async (): Promise<void> => {
    const data = await getAllBoards();
    dispatch(setBoards(data as BoardData[]));
  };

  const openBoard = (boardId: string): void => {
    dispatch(setCurrentBoard(boards.find(board => board.id === boardId) as BoardData));
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div className={styles.mainPage}>
      <NavLink to="/board" className={`${styles.board} ${styles.boardDefaulted}`}>
        <p>Создать доску</p>
      </NavLink>
      {boards &&
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

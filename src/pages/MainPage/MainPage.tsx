import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import dataAPI from '~/services/boardService';
import { BoardState } from '~/interfaces/interfaces';
import { setBoards } from '~/store/reducers/boardSlice';

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const data = dataAPI.useGetAllBoardsQuery('').currentData;
  const { boards } = useAppSelector(state => state.boards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBoards(data));
  }, [data]);

  return (
    <div className={styles.mainPage}>
      <NavLink to="/board" className={`${styles.board} ${styles.boardDefaulted}`}>
        <p>Создать доску</p>
      </NavLink>
      {boards &&
        boards.map((board: BoardState) => {
          return (
            <div key={board.id}>
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

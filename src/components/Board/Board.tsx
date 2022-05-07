import React, { FC } from 'react';
import { ColumnState } from '~/interfaces/interfaces';
import dataAPI from '~/services/boardService';
import { columnOptions } from '~/utils/utils';
import BoardAddItem from '../BoardAddItem';
import BoardColumn from '../BoardColumn';
import styles from './Board.module.scss';

const Board: FC = () => {
  const columns = dataAPI.useGetColumnsQuery('0456c79b-38bf-4f66-9c51-1ccde5f154f9').currentData;
  return (
    <div className={styles.board}>
      {columns &&
        columns.map((column: ColumnState) => {
          return <BoardColumn key={column.id} id={column.id} title={column.title} />;
        })}
      <BoardAddItem options={columnOptions} />
    </div>
  );
};

export default Board;

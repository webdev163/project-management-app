import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, UpdateColumnTasks, ColumnData } from '~/types/api';

export interface CurrentBoard {
  currentBoard: BoardData;
}

const initialState: CurrentBoard = {
  currentBoard: {
    id: '',
    title: '',
    columns: [],
  },
};

export const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<BoardData>) => {
      state.currentBoard = action.payload;
    },
    setColumnTaskData(state, action: PayloadAction<UpdateColumnTasks>) {
      const column = state.currentBoard?.columns?.find(column => column.id === action.payload.columnId);

      if (column) {
        column.tasks = action.payload.tasks;
      }
    },
    setDeleteColumn(state, action: PayloadAction<UpdateColumnTasks>) {
      const allColumns = state.currentBoard?.columns;
      const columnIndex = allColumns?.indexOf(
        allColumns.find(column => column.id === action.payload.columnId) as ColumnData,
      );
      allColumns?.splice(columnIndex as number, 1);
    },
  },
});

export const { setCurrentBoard, setColumnTaskData, setDeleteColumn } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;

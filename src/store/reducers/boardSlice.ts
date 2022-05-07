import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardState, BoardResponse, ColumnState, TaskState } from '~/interfaces/interfaces';

const initialState: BoardResponse = {
  boards: [],
  columns: [],
  tasks: [],
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<BoardState[]>) => {
      state.boards = action.payload;
    },
    setColumns: (state, action: PayloadAction<ColumnState[]>) => {
      state.columns = action.payload;
    },
    setTasks: (state, action: PayloadAction<TaskState[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setBoards, setColumns, setTasks } = boardSlice.actions;

export default boardSlice.reducer;

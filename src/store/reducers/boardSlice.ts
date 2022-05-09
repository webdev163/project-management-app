import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from '~/types/api';

export interface BoardResponse {
  [key: string]: BoardData[];
}

const initialState: BoardResponse = {
  boards: [],
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<BoardData[]>) => {
      state.boards = action.payload;
    },
  },
});

export const { setBoards } = boardSlice.actions;

export default boardSlice.reducer;

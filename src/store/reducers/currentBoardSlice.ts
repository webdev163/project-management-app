import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, UpdateColumnTasks } from '~/types/api';

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
  },
});

export const { setCurrentBoard, setColumnTaskData } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;

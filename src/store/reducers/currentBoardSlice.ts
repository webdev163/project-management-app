import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, ColumnData, TaskData } from '~/types/api';
import { UpdateColumnTasks, DeleteTask } from '~/types/board';

export interface CurrentBoard {
  currentBoard: BoardData;
}

const initialState: CurrentBoard = {
  currentBoard: {
    id: '',
    title: '',
    description: '',
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
    deleteCurrentBoard: (state, action: PayloadAction<BoardData>) => {
      console.log('deleteBoard', state, action);
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
    setDeleteTask(state, action: PayloadAction<DeleteTask>) {
      const allTasks = state.currentBoard?.columns?.find(column => column.id === action.payload.columnId)?.tasks;
      const taskIndex = allTasks?.indexOf(allTasks.find(task => task.id === action.payload.taskId) as TaskData);
      allTasks?.splice(taskIndex as number, 1);
    },
  },
});

export const { setCurrentBoard, deleteCurrentBoard, setColumnTaskData, setDeleteColumn, setDeleteTask } =
  currentBoardSlice.actions;

export default currentBoardSlice.reducer;

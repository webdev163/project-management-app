import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dataAPI from '~/services/boardService';
import boardReducer from './reducers/boardSlice';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

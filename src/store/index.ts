import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dataAPI from '~/services/boardService';
import boardReducer from './reducers/boardSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    [dataAPI.reducerPath]: dataAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dataAPI.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

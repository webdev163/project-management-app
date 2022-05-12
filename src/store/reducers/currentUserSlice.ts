import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrentUser {
  currentUser: string;
}

const initialState: CurrentUser = {
  currentUser: '',
};

export const currentUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

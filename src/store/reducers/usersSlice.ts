import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { UserData } from '~/types/api';
import { ENDPOINT_URL } from '~/utils/constants';

interface UsersState {
  users: UserData[];
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<UserData[]>(`${ENDPOINT_URL}/users`);
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      const error = e as AxiosError;
      return rejectWithValue(error?.response?.data);
    }
  }
});

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending.type]: state => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled.type]: (state, action: PayloadAction<UserData[]>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [getAllUsers.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;

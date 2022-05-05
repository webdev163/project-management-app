import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { LoginResponse, LoginRequest, SignUpRequest, UserData } from '~/types/api';
import { ENDPOINT_URL } from '~/utils/constants';

interface AuthState {
  isLogged: boolean;
  isRegistered: boolean;
  token: string;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  isLogged: false,
  isRegistered: false,
  token: '',
  isLoading: false,
  error: '',
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ login, password }: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(`${ENDPOINT_URL}/signin`, {
        login,
        password,
      });
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        const error = e as AxiosError;
        return rejectWithValue(error?.response?.data);
      }
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, login, password }: SignUpRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<UserData>(`${ENDPOINT_URL}/signup`, {
        name,
        login,
        password,
      });
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        const error = e as AxiosError;
        return rejectWithValue(error?.response?.data);
      }
    }
  },
);

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: state => {
      state.isLoading = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = '';
      const token = action.payload.token;
      state.token = token;
      setToken(token);
    },
    [signIn.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    [signUp.pending.type]: state => {
      state.isLoading = true;
    },
    [signUp.fulfilled.type]: state => {
      state.isLoading = false;
      state.isRegistered = true;
      state.error = '';
    },
    [signUp.rejected.type]: (state, action: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;

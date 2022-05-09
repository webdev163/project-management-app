import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LoginResponse, LoginRequest, SignUpRequest } from '~/types/api';
import { _signIn, _signUp } from '~/services/auth';

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
      const response = await _signIn(login, password);
      return response;
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
      const response = await _signUp(name, login, password);
      return response;
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
  reducers: {
    restoreToken: state => {
      const token = localStorage.getItem('token') || '';
      if (token) {
        state.token = token;
        state.isLogged = true;
      }
    },
    logOut: state => {
      localStorage.removeItem('token');
      state.token = '';
      state.isLogged = false;
    },
    resetRegistrationStatus: state => {
      state.isRegistered = false;
    },
  },
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

export const { restoreToken, logOut, resetRegistrationStatus } = authSlice.actions;

export default authSlice.reducer;

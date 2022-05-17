import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LoginResponse, LoginRequest, SignUpRequest, UpdateRequest, UserData, UpdateResponse } from '~/types/api';
import { _signIn, _signUp } from '~/services/auth';
import { _updateUser } from '~/services/users';

interface AuthState {
  isLogged: boolean;
  isRegistered: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  token: string;
  login: string;
  userId: string;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  isLogged: false,
  isRegistered: false,
  isUpdated: false,
  isDeleted: false,
  token: '',
  login: '',
  userId: '',
  isLoading: false,
  error: '',
};

export const signIn = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
  'auth/signIn',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await _signIn(login, password);
      return response;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const signUp = createAsyncThunk<UserData, SignUpRequest, { rejectValue: string }>(
  'auth/signUp',
  async ({ name, login, password }, { rejectWithValue }) => {
    try {
      const response = await _signUp(name, login, password);
      return response;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
    }
  },
);

export const updateUser = createAsyncThunk<UpdateResponse | unknown, UpdateRequest, { rejectValue: string }>(
  'auth/update',
  async ({ id, name, login, password }, { rejectWithValue }) => {
    try {
      const response = await _updateUser(id, name, login, password);
      return response;
    } catch (e) {
      return rejectWithValue((e as AxiosError).message);
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    logOut: state => {
      localStorage.removeItem('token');
      state.token = '';
      state.isLogged = false;
    },
    resetRegistrationStatus: state => {
      state.isRegistered = false;
    },
    clearError: state => {
      state.error = '';
    },
    resetIsUpdated: state => {
      state.isUpdated = false;
    },
    setIsDeleted: state => {
      state.isDeleted = true;
    },
    resetIsDeleted: state => {
      state.isDeleted = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = '';
      const token = action.payload.token;
      state.token = token;
      setToken(token);
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(signUp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, state => {
      state.isLoading = false;
      state.isRegistered = true;
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, state => {
      state.isLoading = false;
      state.isUpdated = true;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  restoreToken,
  logOut,
  resetRegistrationStatus,
  setUserId,
  setUserLogin,
  clearError,
  resetIsUpdated,
  setIsDeleted,
  resetIsDeleted,
} = authSlice.actions;

export default authSlice.reducer;

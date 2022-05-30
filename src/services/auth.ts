import axios from 'axios';
import { LoginResponse, UserData } from '~/types/api';
import { ENDPOINT_URL } from '~/utils/constants';

export const _signIn = async (login: string, password: string) => {
  const response = await axios.post<LoginResponse>(`${ENDPOINT_URL}/signin`, {
    login,
    password,
  });
  return response.data;
};

export const _signUp = async (name: string, login: string, password: string) => {
  const response = await axios.post<UserData>(`${ENDPOINT_URL}/signup`, {
    name,
    login,
    password,
  });
  return response.data;
};

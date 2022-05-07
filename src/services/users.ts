import axios, { AxiosError } from 'axios';
import { ENDPOINT_URL } from '~/utils/constants';
import { getToken } from '~/utils/getToken';
import { UserData } from '~/types/api';

export const getAllUsers = async () => {
  try {
    const response = await axios.get<UserData[]>(`${ENDPOINT_URL}/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      const error = e as AxiosError;
      return error.response;
    }
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get<UserData>(`${ENDPOINT_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      const error = e as AxiosError;
      return error.response;
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete<UserData>(`${ENDPOINT_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      const error = e as AxiosError;
      return error.response;
    }
  }
};

export const updateUser = async (id: string, name: string, login: string, password: string) => {
  try {
    const response = await axios.put<UserData>(
      `${ENDPOINT_URL}/users/${id}`,
      {
        name,
        login,
        password,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      },
    );
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      const error = e as AxiosError;
      return error.response;
    }
  }
};

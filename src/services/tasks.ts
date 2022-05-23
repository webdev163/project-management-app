import axios, { AxiosError } from 'axios';
import { ENDPOINT_URL } from '~/utils/constants';
import { getToken } from '~/utils/getToken';
import { TaskData } from '~/types/api';

export const getAllTasks = async (boardId: string, columnId: string) => {
  try {
    const response = await axios.get<TaskData[]>(`${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      const error = e as AxiosError;
      return error.response;
    }
  }
};

export const createTask = async (
  boardId: string,
  columnId: string,
  title: string,
  description: string,
  userId: string,
) => {
  try {
    const response = await axios.post<TaskData>(
      `${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}/tasks`,
      {
        title,
        description,
        userId,
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

export const getTask = async (boardId: string, columnId: string, taskId: string) => {
  try {
    const response = await axios.get<TaskData>(
      `${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
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

export const deleteTask = async (boardId: string, columnId: string, taskId: string) => {
  try {
    const response = await axios.delete<null>(`${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
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

export const updateTask = async (
  boardId: string,
  columnId: string,
  newColumnId: string,
  taskId: string,
  title: string,
  order: number,
  description: string,
  userId: string,
) => {
  try {
    const response = await axios.put<TaskData>(
      `${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId: newColumnId,
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

import axios, { AxiosError } from 'axios';
import { ENDPOINT_URL } from '~/utils/constants';
import { getToken } from '~/utils/getToken';
import { ColumnData } from '~/types/api';

export const getAllColumns = async (boardId: string) => {
  try {
    const response = await axios.get<ColumnData[]>(`${ENDPOINT_URL}/boards/${boardId}/columns`, {
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

export const createColumn = async (boardId: string, title: string) => {
  try {
    const response = await axios.post<ColumnData>(
      `${ENDPOINT_URL}/boards/${boardId}/columns`,
      {
        title,
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

export const getColumn = async (boardId: string, columnId: string) => {
  try {
    const response = await axios.get<ColumnData>(`${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}`, {
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

export const deleteColumn = async (boardId: string, columnId: string) => {
  try {
    const response = await axios.delete<null>(`${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}`, {
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

export const updateColumn = async (
  boardId: string,
  columnId: string,
  // newColumnId: string,
  title: string,
  order: number,
) => {
  try {
    const response = await axios.put<ColumnData>(
      `${ENDPOINT_URL}/boards/${boardId}/columns/${columnId}`,
      {
        // columnId: newColumnId,
        title,
        order,
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

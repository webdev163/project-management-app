import axios, { AxiosError } from 'axios';
import { ENDPOINT_URL } from '~/utils/constants';
import { getToken } from '~/utils/getToken';

export const uploadFile = async (taskId: string, file: string) => {
  try {
    const response = await axios.post(
      `${ENDPOINT_URL}/file`,
      {
        taskId,
        file,
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

export const downloadFile = async (taskId: string, filename: string) => {
  try {
    const response = await axios.get(`${ENDPOINT_URL}/file/${taskId}/${filename}`, {
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

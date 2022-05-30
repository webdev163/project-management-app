import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '~/store';
import { logOut, setError } from '~/store/reducers/authSlice';
import { getLang } from '~/utils/getLang';
import { ServerResponseEn, ServerResponseRu } from '~/types/api';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const errData = error.response?.data;
  const lang = getLang();
  if (errData?.statusCode === 400) {
    store.dispatch(setError(lang === 'en' ? ServerResponseEn.UNKNOWN_ERROR : ServerResponseRu.UNKNOWN_ERROR));
  }
  if (error && error?.response?.status === 401) {
    store.dispatch(setError(lang === 'en' ? ServerResponseEn.TOKEN_EXPIRED : ServerResponseRu.TOKEN_EXPIRED));
    store.dispatch(logOut());
  }
  if (errData?.statusCode === 403 && errData.message === 'User was not founded!') {
    store.dispatch(
      setError(lang === 'en' ? ServerResponseEn.WRONG_LOGIN_PASSWORD : ServerResponseRu.WRONG_LOGIN_PASSWORD),
    );
  }
  if (errData?.statusCode === 409 && errData.message === 'User login already exists!') {
    store.dispatch(
      setError(lang === 'en' ? ServerResponseEn.USER_ALREADY_EXISTS : ServerResponseRu.USER_ALREADY_EXISTS),
    );
  }
  if (errData?.statusCode === 500) {
    store.dispatch(setError(lang === 'en' ? ServerResponseEn.UNKNOWN_ERROR : ServerResponseRu.UNKNOWN_ERROR));
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

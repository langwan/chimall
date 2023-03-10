import { userStorage } from '@/store';
import Axios, { InternalAxiosRequestConfig } from 'axios'
import { enqueueSnackbar } from 'notistack';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = userStorage.get('token');
  if (token) {
    config.headers.authorization = `${token}`;
  }

  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: "/api/v1",
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data.body;
  },
  (error) => {
    const { response } = error
    if (response && response.data && response.data.code === -1) {
      enqueueSnackbar(response.data.message, { variant: "error" });
    }
    return Promise.reject(error);
  }
);



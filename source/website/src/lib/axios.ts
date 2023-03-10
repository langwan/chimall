import Axios, { InternalAxiosRequestConfig } from 'axios'
import { enqueueSnackbar } from 'notistack';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  // const token = storage.getToken();
  // if (token) {
  //   config.headers.authorization = `${token}`;
  // }

  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  // baseURL: "/api",
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error
    if (response && response.data && response.data.code === -1) {
      enqueueSnackbar(response.data.message, { variant: "error" });
    }
    return Promise.reject(error);
  }
);



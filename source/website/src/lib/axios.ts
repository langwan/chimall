import Axios, { InternalAxiosRequestConfig } from 'axios'

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
    return Promise.reject(error);
  }
);



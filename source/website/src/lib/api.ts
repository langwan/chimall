import hashPassword from '@/utils/password'
import { axios } from './axios'

export const loginApi = async (phone: string, password: string) => {
  let hp = hashPassword(password);
  return axios.post("/login", { phone, password: hp });
}


export const registerApi = async ({ phone, password, nickname }: Register) => {
  let hp = hashPassword(password);
  return axios.post("/register", { phone, password: hp, nickname });
}

export const getHomeDataApi = async (): Promise<HomePageRes> => {
  return axios.get("/account/goods/homepage")
}
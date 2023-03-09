import hashPassword from '@/utils/password'
import { axios } from './axios'

export const loginApi = async (phone: string, password: string) => {
  let hp = hashPassword(password);
  return axios.post("/api/v1/login", { phone, password: hp });
}


export const registerApi = async ({ phone, password, nickname }: Register) => {
  let hp = hashPassword(password);
  return axios.post("/api/v1/register", { phone, password: hp, nickname });
}
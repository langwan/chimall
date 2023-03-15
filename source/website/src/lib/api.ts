import hashPassword from '@/utils/password'
import { axios } from './axios'

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time * 1000))

export const loginApi = async (phone: string, password: string) => {
  let hp = hashPassword(password);
  return axios.post("/login", { phone, password: hp });
}


export const registerApi = async ({ phone, password, nickname }: Register) => {
  let hp = hashPassword(password);
  return axios.post("/register", { phone, password: hp, nickname });
}

export const getHomeDataApi = async (): Promise<HomePageRes> => {
  return axios.get("/goods/homepage")
}

/**
 * goods start
 * */
export const getGoodApi = async (id: string): Promise<GoodRes> => {
  return axios.get(`/goods/${id}`)
}

/**
 * cart start
 */
export const addCartApi = async (goodId: string, count: number): Promise<CartRes> => {
  return axios.post("/account/cart/add", { goodId, count })
}

export const getCartsApi = async (): Promise<CartRes[]> => {
  return axios.post("/account/cart/list")
}

export const removeCartApi = async (goodId: string): Promise<CartRes> => {
  return axios.post("/account/cart/remove", { goodId })
}
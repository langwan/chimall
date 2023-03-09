import { useRecoilState, useResetRecoilState } from "recoil"
import { userState, userStorage } from '@/store'
import { useState } from 'react'
import { loginApi, registerApi } from '@/lib/api'
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";


export const useUser = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState)
  const resetUser = useResetRecoilState(userState)
  const [errors, setErrors] = useState<UserReqError>({})


  const login = async ({ phone, password }: Login) => {
    try {
      await loginApi(phone, password)
      const token = cookies.get('token')
      if (token) {
        userStorage.set('token', token)
        const userInfo = jwtDecode<Omit<UserInfoState, 'isLogin'>>(token)
        setErrors({})
        setUserInfo({
          isLogin: true,
          ...userInfo
        })
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        setErrors(error.response.data)
      }
      return error
    }
  }

  const logout = () => {
    resetUser()
  }

  const register = async ({ phone, password, nickname }: Register) => {
    try {
      await registerApi({ phone, password, nickname })
      const token = cookies.get('token')
      if (token) {
        userStorage.set('token', token)
        const userInfo = jwtDecode<Omit<UserInfoState, 'isLogin'>>(token)
        setErrors({})
        setUserInfo({
          isLogin: true,
          ...userInfo
        })
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        setErrors(error.response.data)
      }
      return error
    }
  }

  return [userInfo, {
    login,
    logout,
    register,
    errors,
  }] as const

}
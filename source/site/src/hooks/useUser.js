import { useRecoilState, useResetRecoilState } from "recoil"
import { userState } from '../store'
import { useState } from 'react'
import { loginApi, registerApi } from 'Helper/api'
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";


export const useUser = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState)
    const resetUserInfo = useResetRecoilState(userState)
    const [errors, setErrors] = useState({})


    const login = async ({ phone, password }) => {
        try {
            await loginApi(phone, password)
            const token = cookies.get('token')
            const userInfo = jwtDecode(token)
            setErrors({})
            setUserInfo({
                isLogin: true,
                token,
                ...userInfo
            })
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data)
            }
            return error
        }
    }

    const logout = () => {
        cookies.remove('token')
        resetUserInfo()
    }

    const register = async ({ phone, password, nickname }) => {
        try {
            await registerApi({ phone, password, nickname })
            const token = cookies.get('token')
            const userInfo = jwtDecode(token)
            setErrors({})
            setUserInfo({
                isLogin: true,
                token,
                ...userInfo
            })
        } catch (error) {
            console.log(error)
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
    }]

}
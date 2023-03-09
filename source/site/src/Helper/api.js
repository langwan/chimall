import hashPassword from './password'
import { apiRequest } from './axios'

export const loginApi = async (phone, password) => {
    let hp = hashPassword(password);
    return apiRequest.post("/api/v1/login", { phone, password: hp });
}

export const registerApi = async ({ phone, password, nickname }) => {
    let hp = hashPassword(password);
    return apiRequest.post("/api/v1/register", { phone, password: hp, nickname });
}
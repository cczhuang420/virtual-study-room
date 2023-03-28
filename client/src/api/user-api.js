import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVICE_URL

export const useCreateUserHandler = () => {
  return async (nickname, email) => {
    return await axios.post(`${BASE_URL}/users`, {nickname, email})
  }
}

export const useFetchUserHandler = () => {
  return async (filter) => {
    const queryParam = new URLSearchParams(filter).toString()
    return await axios.get(`${BASE_URL}/users?${queryParam}`)
  }
}

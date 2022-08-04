import Axios from './Axios'

export const getUsersHistorys = (skip = 0, take = 10) => {
  return Axios.get(`/api/history/user?skip=${skip}&take=${take}`)
}

export const clearHistory = () => {
  return Axios.patch(`/api/history/clear`)
}
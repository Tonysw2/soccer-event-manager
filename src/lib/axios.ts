import axios from 'axios'

import { storageKeys } from '@/config/storageKeys'

export const api = axios.create()

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storageKeys.googleAccessToken)
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

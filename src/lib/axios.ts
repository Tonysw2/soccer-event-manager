import axios from 'axios'
import { redirect } from 'react-router-dom'

import { storageKeys } from '@/config/storageKeys'
import { sleep } from '@/utils/sleep'

export const api = axios.create()

api.interceptors.request.use(async (config) => {
  await sleep(2000)
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      redirect('/sign-in')
      localStorage.removeItem(storageKeys.googleAccessToken)
      localStorage.removeItem(storageKeys.googleApplicationState)
    }

    return Promise.reject(error)
  },
)

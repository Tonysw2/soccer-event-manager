import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from 'axios'

import { storageKeys } from '@/config/storageKeys'

export default class HttpClient {
  private api: AxiosInstance

  constructor(config?: CreateAxiosDefaults) {
    this.api = axios.create(config)

    this.addResponseInterceptor(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem(storageKeys.googleAccessToken)
          localStorage.removeItem(storageKeys.googleApplicationState)
          window.location.href = 'http://localhost:5173/sign-in'
        }

        return Promise.reject(error)
      },
    )
  }

  addRequestInterceptor(
    onSuccess?: (
      config: InternalAxiosRequestConfig,
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    onRejected?: (error: any) => any | null,
  ) {
    this.api.interceptors.request.use(onSuccess, onRejected)
  }

  addResponseInterceptor(
    onSuccess?: (
      response: AxiosResponse,
    ) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any | null,
  ) {
    this.api.interceptors.response.use(onSuccess, onRejected)
  }

  get<T = any>(path: string, options?: AxiosRequestConfig) {
    return this.api.get<T>(path, { ...options, method: 'GET' })
  }

  post<T = any>(path: string, data?: any, options?: AxiosRequestConfig) {
    return this.api.post<T>(path, data, { ...options, method: 'POST' })
  }

  put<T = any>(path: string, data?: any, options?: AxiosRequestConfig) {
    return this.api.put<T>(path, data, { ...options, method: 'PUT' })
  }

  delete<T = any>(path: string, options?: AxiosRequestConfig) {
    return this.api.delete<T>(path, { ...options, method: 'DELETE' })
  }
}

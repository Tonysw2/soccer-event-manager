import qs from 'qs'

import { storageKeys } from '@/config/storageKeys'

import HttpClient from './http/httpClient'

export interface GoogleAuthOptions {
  state?: string
  client_id: string
  login_hint?: string
  redirect_uri: string
  response_type: 'token'
  scope: string | string[]
  include_granted_scopes?: boolean
  enable_granular_consent?: boolean
  prompt?: 'none' | 'consent' | 'select_account'
}

export interface UserInfoResponse {
  family_name: string
  name: string
  picture: string
  email: string
  given_name: string
  id: string
  verified_email: boolean
}

class GoogleAuth {
  constructor() {
    this.api = new HttpClient()
  }

  private api: HttpClient

  signIn = (options: GoogleAuthOptions) => {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const queries = qs.stringify(options)

    window.location.href = `${baseUrl}?${queries}`
  }

  signOut = async () => {
    const baseUrl = 'https://oauth2.googleapis.com/revoke'
    const accessToken = localStorage.getItem(storageKeys.googleAccessToken)
    const query = qs.stringify({ token: accessToken })
    await this.api.post(`${baseUrl}?${query}`)
  }

  getUserInfo = async () => {
    const baseUrl = 'https://www.googleapis.com/userinfo/v2/me'
    const accessToken = localStorage.getItem(storageKeys.googleAccessToken)
    const response = await this.api.get<UserInfoResponse>(baseUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  }
}

export const GoogleAuthServices = new GoogleAuth()

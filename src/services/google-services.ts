import qs from 'qs'

import { env } from '@/config/env'

export interface GoogleAuthOptions {
  state?: string
  redirect_uri?: string
  scope: string | string[]
  include_granted_scopes?: boolean
}

export class GoogleServices {
  static signIn = (options: GoogleAuthOptions) => {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

    const params = {
      ...options,
      response_type: 'token',
      client_id: env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: options.redirect_uri || env.VITE_GOOGLE_REDIRECT_URL,
    }

    const queries = qs.stringify(params)

    window.location.href = `${baseUrl}?${queries}`
  }
}

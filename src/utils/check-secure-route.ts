import { redirect } from 'react-router-dom'

import { env } from '@/config/env'
import { storageKeys } from '@/config/storageKeys'

export function checkSecureRoute() {
  const accessToken = localStorage.getItem(storageKeys.googleAccessToken)
  const applicationState = localStorage.getItem(
    storageKeys.googleApplicationState,
  )

  if (
    !accessToken ||
    !applicationState ||
    applicationState !== env.VITE_GOOGLE_STATE
  ) {
    return redirect('/sign-in')
  }

  return null
}

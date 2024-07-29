import { Loader2 } from 'lucide-react'
import qs from 'qs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { env } from '@/config/env'
import { storageKeys } from '@/config/storageKeys'

export function GoogleCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = window.location.hash.substring(1)
    const params = qs.parse(queryParams)

    if (params.error) {
      navigate(`/sign-in?${queryParams}`, { replace: true })
    }

    if (params.access_token && params.state === env.VITE_GOOGLE_STATE) {
      console.log('here')
      localStorage.setItem(
        storageKeys.googleAccessToken,
        params.access_token as string,
      )

      localStorage.setItem(
        storageKeys.googleApplicationState,
        params.state as string,
      )

      navigate('/home', { replace: true })
    }
  }, [])

  return (
    <main className="grid h-screen w-full place-items-center">
      <Loader2 className="size-10 animate-spin" />
    </main>
  )
}

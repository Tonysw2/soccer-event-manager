import { useSearchParams } from 'react-router-dom'

import { GoogleIcon } from '@/components/icons/google-icon'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { env } from '@/config/env'
import { GoogleAuthServices } from '@/services/google-auth-services'

export function SignIn() {
  const [searchParams] = useSearchParams()

  const error = searchParams.get('error')

  async function signInWithGoogle() {
    GoogleAuthServices.signIn({
      client_id: env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: 'http://localhost:5173/callbacks/google',
      response_type: 'token',
      scope: '',
    })
  }

  return (
    <main className="grid h-screen w-full place-items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Sign-in</CardTitle>
          <CardDescription>
            <strong>Soccer Event Manager</strong> simplifies Google Calendar
            management. Create, update, delete events, and set reminders
            effortlessly. Syncs across all devices for easy scheduling.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex w-full flex-col gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex w-full items-center gap-1"
              onClick={signInWithGoogle}
            >
              <GoogleIcon />
              Sign-in with google
            </Button>

            {error ? (
              <p className="text-center text-sm text-red-500">
                An error ocurred while sign-in, please try again.
              </p>
            ) : null}
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

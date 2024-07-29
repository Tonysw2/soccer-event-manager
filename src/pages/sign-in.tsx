import { GoogleIcon } from '@/components/icons/google-icon'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function SignIn() {
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
          <Button
            type="button"
            variant="secondary"
            className="flex w-full items-center gap-1"
          >
            <GoogleIcon />
            Sign-in with google
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

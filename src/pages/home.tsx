import { useFieldArray, useForm } from 'react-hook-form'

import { ProfileMenu } from '@/components/profile-menu'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function Home() {
  const form = useForm()

  const events = useFieldArray({
    control: form.control,
    name: 'events',
  })

  return (
    <main className="mx-auto w-full max-w-7xl px-5">
      <header className="mt-10">
        <ProfileMenu />
      </header>

      <section>
        {events.fields.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  )
}

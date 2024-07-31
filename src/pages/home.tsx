import { CreateEventForm } from '@/components/form/create-event/create-event-form'
import { ProfileMenu } from '@/components/profile-menu'

export function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-10">
      <header className="my-10 rounded-lg border px-4 py-2">
        <ProfileMenu />
      </header>

      <section>
        <CreateEventForm />
      </section>
    </main>
  )
}

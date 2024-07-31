import { Trash2 } from 'lucide-react'

import { DatePicker } from '@/components/date-picker'
import { useCreateEventForm } from '@/hooks/use-create-event-form'

import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { SelectCalendar } from './select-calendar'
import { SelectTime } from './select-time'

export function CreateEventForm() {
  const { events } = useCreateEventForm()

  return (
    <form className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" type="submit">
          Submit event creation
        </Button>
        <Button size="sm" type="button" variant="secondary">
          Add event
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.fields.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-2">
              <div className="col-span-full flex flex-col gap-1.5">
                <Label>Title</Label>
                <Input type="text" />
              </div>

              <div className="col-span-full flex flex-col gap-1.5">
                <Label>Description</Label>
                <Input type="text" />
              </div>

              <div className="col-span-full flex flex-col gap-1.5">
                <Label>Location</Label>
                <Input type="text" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Start date</Label>
                <DatePicker />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>End date</Label>
                <DatePicker />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Start time</Label>
                <SelectTime />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>End time</Label>
                <SelectTime />
              </div>

              <div className="col-span-full flex flex-col gap-1.5">
                <SelectCalendar />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                size="sm"
                type="button"
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="mr-1.5 size-4" />
                Delete event
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </form>
  )
}

import { PlusCircle, Trash2 } from 'lucide-react'
import { Controller, FormProvider } from 'react-hook-form'

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
import { SelectEndTimeInput } from './select-end-time-input'
import { SelectStartTimeInput } from './select-start-time-input'

export function CreateEventForm() {
  const { form, events, handleAddEvent, handleRemoveEvent } =
    useCreateEventForm()

  console.log(form.formState.errors)

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit((data: any) => console.log(data))}
    >
      <div className="flex gap-2 bg-background">
        <Button size="sm" type="submit">
          Submit event creation
        </Button>
      </div>

      <FormProvider {...form}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.fields.map((event, eventIndex) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-2">
                <div className="col-span-full flex flex-col gap-1.5">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    {...form.register(`events.${eventIndex}.summary`)}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-1.5">
                  <Label>Description</Label>
                  <Input
                    type="text"
                    {...form.register(`events.${eventIndex}.description`)}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-1.5">
                  <Label>Location</Label>
                  <Input
                    type="text"
                    {...form.register(`events.${eventIndex}.location`)}
                  />
                </div>

                <Controller
                  control={form.control}
                  name={`events.${eventIndex}.startDate`}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                      <Label>Start date</Label>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />

                <Controller
                  control={form.control}
                  name={`events.${eventIndex}.endDate`}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                      <Label>End date</Label>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />

                <SelectStartTimeInput eventIndex={eventIndex} />

                <SelectEndTimeInput eventIndex={eventIndex} />

                <Controller
                  control={form.control}
                  name={`events.${eventIndex}.calendar`}
                  render={({ field }) => (
                    <div className="col-span-full flex flex-col gap-1.5">
                      <SelectCalendar
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </CardContent>

              <CardFooter>
                <Button
                  size="sm"
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={handleRemoveEvent(eventIndex)}
                >
                  <Trash2 className="mr-1.5 size-4" />
                  Delete event
                </Button>
              </CardFooter>
            </Card>
          ))}

          <button
            type="button"
            className="flex h-[564px] items-center justify-center rounded-lg border"
            onClick={handleAddEvent}
          >
            <PlusCircle className="size-6" />
          </button>
        </div>
      </FormProvider>
    </form>
  )
}

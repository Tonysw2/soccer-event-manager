import { ErrorMessage } from '@hookform/error-message'
import { format, parse } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { Controller, FormProvider } from 'react-hook-form'
import { toast } from 'sonner'

import {
  CreateEventDataType,
  useCreateEventForm,
} from '@/hooks/use-create-event-form'
import { GoogleCalendarApiServices } from '@/services/google-calendar-api-services'

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
import { FormError } from '../form-error'
import { EndDatePicker } from './end-date-picker'
import { SelectCalendar } from './select-calendar'
import { SelectEndTimeInput } from './select-end-time-input'
import { SelectStartTimeInput } from './select-start-time-input'
import { StartDatePicker } from './start-date-picker'

export function CreateEventForm() {
  const {
    form,
    events,
    resetForm,
    handleAddEvent,
    resetEventFields,
    handleRemoveEvent,
  } = useCreateEventForm()

  async function handleCreateEvent(data: CreateEventDataType) {
    const toastId = toast.loading(
      'Your events are currently being added to your calendar. This process may take a few moments. Thank you for your patience!',
    )

    try {
      const promises = data.events.map((event) => {
        let data

        if (event.startTime === 'none') {
          data = {
            summary: event.summary,
            description: event.description,
            location: event.location,
            start: {
              date: format(event.startDate, 'yyyy-MM-dd'),
            },
            end: {
              date: format(event.endDate, 'yyyy-MM-dd'),
            },
          }
        }

        if (event.startTime !== 'none') {
          data = {
            summary: event.summary,
            description: event.description,
            location: event.location,
            start: {
              dateTime: parse(
                event.startTime!,
                'HH:mm',
                event.startDate,
              ).toISOString(),
            },
            end: {
              dateTime: parse(
                event.endTime!,
                'HH:mm',
                event.endDate,
              ).toISOString(),
            },
          }
        }

        return GoogleCalendarApiServices.createEvent({
          calendarId: event.calendar,
          data,
        })
      })

      await Promise.all(promises)

      toast.success(
        'Congratulations! Your events were added to Google Calendar, go and check your calendar.',
        {
          id: toastId,
        },
      )
    } catch (error) {
      toast.error(
        'Ops! An error ocurred while adding events to Google Calendar.',
        {
          id: toastId,
        },
      )
    }
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(handleCreateEvent)}>
      <FormProvider {...form}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.fields.map((event, eventIndex) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-x-2 gap-y-4">
                <div className="col-span-full flex flex-col gap-1.5">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    {...form.register(`events.${eventIndex}.summary`)}
                  />
                  <ErrorMessage
                    errors={form.formState.errors}
                    name={`events.${eventIndex}.summary`}
                    render={({ message }) => <FormError message={message} />}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-1.5">
                  <Label className="mb-1.5">Description</Label>
                  <Input
                    type="text"
                    {...form.register(`events.${eventIndex}.description`)}
                  />
                  <ErrorMessage
                    errors={form.formState.errors}
                    name={`events.${eventIndex}.description`}
                    render={({ message }) => <FormError message={message} />}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-1.5">
                  <Label className="mb-1.5">Location</Label>
                  <Input
                    type="text"
                    {...form.register(`events.${eventIndex}.location`)}
                  />
                  <ErrorMessage
                    errors={form.formState.errors}
                    name={`events.${eventIndex}.location`}
                    render={({ message }) => <FormError message={message} />}
                  />
                </div>

                <StartDatePicker eventIndex={eventIndex} />

                <EndDatePicker eventIndex={eventIndex} />

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
                      <ErrorMessage
                        errors={form.formState.errors}
                        name={`events.${eventIndex}.calendar`}
                        render={({ message }) => (
                          <FormError message={message} />
                        )}
                      />
                    </div>
                  )}
                />
              </CardContent>

              <CardFooter className="grid grid-cols-1 gap-2 xs:grid-cols-2">
                <Button
                  size="sm"
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={handleRemoveEvent(eventIndex)}
                  disabled={form.formState.isSubmitting}
                >
                  <Trash2 className="mr-1.5 size-4" />
                  Delete event
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={resetEventFields(eventIndex)}
                >
                  Reset fields
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex gap-2 bg-background">
          <Button
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Submit event creation
          </Button>

          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={handleAddEvent}
          >
            Add another event
          </Button>

          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={resetForm}
          >
            Reset form
          </Button>
        </div>
      </FormProvider>
    </form>
  )
}

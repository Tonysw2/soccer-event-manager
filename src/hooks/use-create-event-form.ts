import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createEventSchema } from '@/schemas/create-event-schema'
import { GoogleCalendarApiServices } from '@/services/google-calendar-api-services'

export type CreateEventDataType = z.infer<typeof createEventSchema>

export function useCreateEventForm() {
  const form = useForm<CreateEventDataType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      events: [
        {
          summary: '',
          description: '',
          location: '',
          startDate: new Date(),
          endDate: new Date(),
          startTime: 'none',
          endTime: 'none',
          calendar: 'none',
        },
      ],
    },
  })

  const events = useFieldArray({
    control: form.control,
    name: 'events',
  })

  function handleAddEvent() {
    events.append({
      summary: '',
      description: '',
      location: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: '00:00',
      endTime: '01:00',
      calendar: 'none',
    })
  }

  function resetEventFields(eventIndex: number) {
    return () => {
      form.resetField(`events.${eventIndex}.summary`)
      form.resetField(`events.${eventIndex}.description`)
      form.resetField(`events.${eventIndex}.location`)
      form.resetField(`events.${eventIndex}.startDate`)
      form.resetField(`events.${eventIndex}.endDate`)
      form.resetField(`events.${eventIndex}.startTime`)
      form.resetField(`events.${eventIndex}.endTime`)
      form.resetField(`events.${eventIndex}.calendar`)
    }
  }

  function resetForm() {
    form.reset()
  }

  function handleRemoveEvent(eventIndex: number) {
    return () => {
      if (events.fields.length <= 1) {
        toast.warning('You cannot remove the last event.')
        return
      }

      events.remove(eventIndex)
    }
  }

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

  return {
    form,
    events,
    resetForm,
    handleAddEvent,
    resetEventFields,
    handleRemoveEvent,
    handleCreateEvent,
  }
}

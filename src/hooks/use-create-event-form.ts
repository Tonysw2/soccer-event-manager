import { zodResolver } from '@hookform/resolvers/zod'
import { isBefore, parse, startOfDay } from 'date-fns'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const createEventSchema = z.object({
  events: z
    .array(
      z
        .object({
          summary: z.string().min(1, { message: 'Insert a title.' }),
          description: z.string().optional(),
          location: z.string().optional(),
          startDate: z.date(),
          endDate: z.date(),
          startTime: z.string().optional(),
          endTime: z.string().optional(),
          calendar: z.string().refine((value) => value !== 'none', {
            message: 'You must choose a calendar.',
          }),
        })
        .refine(
          (value) =>
            !isBefore(
              startOfDay(new Date(value.endDate)),
              startOfDay(new Date(value.startDate)),
            ),
          {
            message: 'The end date cannot be before start date.',
            path: ['endDate'],
          },
        )
        .refine(
          (value) => {
            if (!value.startTime || !value.endTime) return true

            const startTimeAsDate = parse(
              value.startTime,
              'HH:mm',
              value.startDate,
            )
            const endTimeAsDate = parse(value.endTime, 'HH:mm', value.endDate)

            return !isBefore(endTimeAsDate, startTimeAsDate)
          },
          {
            message: 'The end time cannot be smaller than the start time.',
            path: ['endTime'],
          },
        ),
    )
    .min(1, { message: 'You must add at least one event.' }),
})

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

  function handleRemoveEvent(eventIndex: number) {
    return () => {
      events.remove(eventIndex)
    }
  }

  return {
    form,
    events,
    handleAddEvent,
    handleRemoveEvent,
  }
}

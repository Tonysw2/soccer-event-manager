import { isBefore, parse, startOfDay } from 'date-fns'
import { z } from 'zod'

export const createEventSchema = z.object({
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

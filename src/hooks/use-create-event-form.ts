import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createEventSchema } from '@/schemas/create-event-schema'

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
      if (eventIndex === 0) {
        toast.warning('You cannot remove the last event.')
        return
      }

      events.remove(eventIndex)
    }
  }

  return {
    form,
    events,
    resetForm,
    handleAddEvent,
    resetEventFields,
    handleRemoveEvent,
  }
}

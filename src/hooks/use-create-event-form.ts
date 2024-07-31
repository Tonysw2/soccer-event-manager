import { useFieldArray, useForm } from 'react-hook-form'

export function useCreateEventForm() {
  const form = useForm({
    defaultValues: {
      events: [{}, {}],
    },
  })

  const events = useFieldArray({
    control: form.control,
    name: 'events',
  })

  return {
    form,
    events,
  }
}

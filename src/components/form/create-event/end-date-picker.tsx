import { ErrorMessage } from '@hookform/error-message'
import { Controller, useFormContext } from 'react-hook-form'

import { DatePicker } from '@/components/date-picker'
import { Label } from '@/components/ui/label'
import { CreateEventDataType } from '@/hooks/use-create-event-form'

import { FormError } from '../form-error'

interface EndDatePickerProps {
  eventIndex: number
}

export function EndDatePicker({ eventIndex }: EndDatePickerProps) {
  const form = useFormContext<CreateEventDataType>()

  const startDate = form.watch(`events.${eventIndex}.startDate`)

  return (
    <Controller
      control={form.control}
      name={`events.${eventIndex}.endDate`}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <Label>End date</Label>
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            disabled={{ before: startDate }}
          />
          <ErrorMessage
            errors={form.formState.errors}
            name={`events.${eventIndex}.endDate`}
            render={({ message }) => <FormError message={message} />}
          />
        </div>
      )}
    />
  )
}

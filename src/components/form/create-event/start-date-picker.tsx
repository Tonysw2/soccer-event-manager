import { ErrorMessage } from '@hookform/error-message'
import { Controller, useFormContext } from 'react-hook-form'

import { DatePicker } from '@/components/date-picker'
import { Label } from '@/components/ui/label'
import type { CreateEventDataType } from '@/hooks/use-create-event-form'

import { FormError } from '../form-error'

interface StartDatePickerProps {
  eventIndex: number
}

export function StartDatePicker({ eventIndex }: StartDatePickerProps) {
  const form = useFormContext<CreateEventDataType>()

  function handleChange(onChange: (...event: any[]) => void) {
    return (value: Date) => {
      onChange(value)
      form.setValue(`events.${eventIndex}.endDate`, value)
    }
  }

  return (
    <Controller
      control={form.control}
      name={`events.${eventIndex}.startDate`}
      render={({ field }) => (
        <div className="col-span-full flex flex-col gap-1.5 xs:col-span-1">
          <Label>Start date</Label>
          <DatePicker
            value={field.value}
            onChange={handleChange(field.onChange)}
          />
          <ErrorMessage
            errors={form.formState.errors}
            name={`events.${eventIndex}.startDate`}
            render={({ message }) => <FormError message={message} />}
          />
        </div>
      )}
    />
  )
}

import { ErrorMessage } from '@hookform/error-message'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { CreateEventDataType } from '@/hooks/use-create-event-form'

import { FormError } from '../form-error'
import { SelectTime } from './select-time'

interface SelectEndTimeInputProps {
  eventIndex: number
}

export function SelectEndTimeInput({ eventIndex }: SelectEndTimeInputProps) {
  const form = useFormContext<CreateEventDataType>()

  const isStartTimeDirty =
    form.formState.dirtyFields.events?.at(eventIndex)?.startTime

  return (
    <Controller
      control={form.control}
      name={`events.${eventIndex}.endTime`}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <Label>End time</Label>
          <SelectTime
            value={field.value}
            disabled={!isStartTimeDirty}
            onValueChange={field.onChange}
          />
          <ErrorMessage
            errors={form.formState.errors}
            name={`events.${eventIndex}.endTime`}
            render={({ message }) => <FormError message={message} />}
          />
        </div>
      )}
    />
  )
}

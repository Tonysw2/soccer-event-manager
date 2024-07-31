import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { CreateEventDataType } from '@/hooks/use-create-event-form'

import { SelectTime } from './select-time'

interface SelectEndTimeInputProps {
  eventIndex: number
}

export function SelectEndTimeInput({ eventIndex }: SelectEndTimeInputProps) {
  const form = useFormContext<CreateEventDataType>()

  const startTime = form.watch(`events.${eventIndex}.startTime`)

  return (
    <Controller
      control={form.control}
      name={`events.${eventIndex}.endTime`}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <Label>End time</Label>
          <SelectTime
            value={field.value}
            onValueChange={field.onChange}
            from={startTime}
            disabled={
              !form.formState.dirtyFields.events?.at(eventIndex)?.startTime
            }
          />
        </div>
      )}
    />
  )
}

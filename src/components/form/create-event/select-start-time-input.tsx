import { addHours, format, parse } from 'date-fns'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { CreateEventDataType } from '@/hooks/use-create-event-form'

import { SelectTime } from './select-time'

interface SelectStartTimeInputProps {
  eventIndex: number
}

export function SelectStartTimeInput({
  eventIndex,
}: SelectStartTimeInputProps) {
  const form = useFormContext<CreateEventDataType>()

  function addHoursToTime(time: string, hoursToAdd: number) {
    const timeAsDate = parse(time, 'HH:mm', new Date())
    const updatedTime = addHours(timeAsDate, hoursToAdd)
    return format(updatedTime, 'HH:mm')
  }

  function handleChange(onChange: (...event: any[]) => void) {
    return (value: string) => {
      const increasedTime = addHoursToTime(value, 1)
      onChange(value)
      form.setValue(`events.${eventIndex}.endTime`, increasedTime)
    }
  }

  return (
    <Controller
      control={form.control}
      name={`events.${eventIndex}.startTime`}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <Label>Start time</Label>
          <SelectTime
            value={field.value}
            onValueChange={handleChange(field.onChange)}
          />
        </div>
      )}
    />
  )
}

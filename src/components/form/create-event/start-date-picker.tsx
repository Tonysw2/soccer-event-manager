import { Controller, useFormContext } from 'react-hook-form'

import { DatePicker } from '@/components/date-picker'
import { Label } from '@/components/ui/label'
import { CreateEventDataType } from '@/hooks/use-create-event-form'

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
        <div className="xs:col-span-1 col-span-full flex flex-col gap-1.5">
          <Label>Start date</Label>
          <DatePicker
            value={field.value}
            onChange={handleChange(field.onChange)}
          />
        </div>
      )}
    />
  )
}

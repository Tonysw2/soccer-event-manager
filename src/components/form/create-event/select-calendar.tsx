import type { SelectProps } from '@radix-ui/react-select'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useListCalendars } from '@/hooks/use-list-calendars'

interface SelectCalendarProps extends SelectProps {}

export function SelectCalendar({ ...rest }: SelectCalendarProps) {
  const { calendars, isLoadingCalendars } = useListCalendars()

  return (
    <Select
      disabled={isLoadingCalendars}
      {...rest}
    >
      <SelectTrigger loading={isLoadingCalendars}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Pick a calendar</SelectItem>
        {calendars?.map((calendar) => (
          <SelectItem
            key={calendar.id}
            value={calendar.id}
          >
            {calendar.summary}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

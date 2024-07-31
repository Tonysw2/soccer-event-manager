import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useListCalendars } from '@/hooks/use-list-calendars'

interface SelectCalendarProps {
  value: string
  onChange(): void
}

export function SelectCalendar({ value, onChange }: SelectCalendarProps) {
  const { calendars, isLoadingCalendars } = useListCalendars()

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={isLoadingCalendars}
    >
      <SelectTrigger loading={isLoadingCalendars}>
        <SelectValue placeholder="Pick a calendar" />
      </SelectTrigger>
      <SelectContent>
        {calendars?.map((calendar) => (
          <SelectItem key={calendar.id} value={calendar.id}>
            {calendar.summary}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateTimeIntervals } from '@/utils/generate-time-intervals'

interface SelectTime {
  value: string
  onChange(): void
}

export function SelectTime({ value, onChange }: SelectTime) {
  const timeSlots = generateTimeIntervals(15)

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Pick a time" />
      </SelectTrigger>
      <SelectContent>
        {timeSlots.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

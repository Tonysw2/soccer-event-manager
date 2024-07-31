import { SelectProps } from '@radix-ui/react-select'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateTimeIntervals } from '@/utils/generate-time-intervals'

interface SelectTimeProps extends SelectProps {
  from?: string
  interval?: number
}

export function SelectTime({
  interval = 15,
  from = '00:00',
  ...rest
}: SelectTimeProps) {
  const timeSlots = generateTimeIntervals(interval, from)

  return (
    <Select {...rest}>
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

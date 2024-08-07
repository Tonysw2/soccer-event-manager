import { SelectProps } from '@radix-ui/react-select'
import { useMemo } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateTimeIntervals } from '@/utils/generate-time-intervals'

interface SelectTimeProps extends SelectProps {
  interval?: number
}

export function SelectTime({ interval = 15, ...rest }: SelectTimeProps) {
  const timeSlots = useMemo(() => {
    return generateTimeIntervals(interval)
  }, [])

  const content = useMemo(
    () =>
      timeSlots.map((time) => (
        <SelectItem key={time} value={time}>
          {time}
        </SelectItem>
      )),
    [],
  )

  return (
    <Select {...rest}>
      <SelectTrigger>
        <SelectValue placeholder="Pick a time" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
        {content}
      </SelectContent>
    </Select>
  )
}

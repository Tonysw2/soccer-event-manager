import { addMinutes, format, parse, startOfDay } from 'date-fns'

export function generateTimeIntervals(
  intervalInMinutes: number,
  from = '00:00',
) {
  const timeSlots = []
  let currentTime = parse(from, 'HH:mm', startOfDay(new Date()))

  while (format(currentTime, 'HH:mm') !== '00:00' || timeSlots.length === 0) {
    timeSlots.push(format(currentTime, 'HH:mm'))
    currentTime = addMinutes(currentTime, intervalInMinutes)
  }

  return timeSlots
}

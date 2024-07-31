import { addMinutes, format, startOfDay } from 'date-fns'

export function generateTimeIntervals(intervalInMinutes: number) {
  const timeSlots = []
  let currentTime = startOfDay(new Date())

  while (format(currentTime, 'HH:mm') !== '00:00' || timeSlots.length === 0) {
    timeSlots.push(format(currentTime, 'HH:mm'))
    currentTime = addMinutes(currentTime, intervalInMinutes)
  }

  return timeSlots
}

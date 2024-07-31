import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/config/queryKeys'
import { GoogleCalendarApiServices } from '@/services/google-calendar-api-services'

export function useListCalendars() {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calendars],
    queryFn: ({ signal }) =>
      GoogleCalendarApiServices.listCalendars({
        signal,
      }),
    staleTime: Infinity,
  })

  const googleCreatedIdentifiers = ['holiday', 'contacts', 'weather', 'sports']

  const calendars = data?.items.filter(
    (calendar) =>
      !googleCreatedIdentifiers.some((identifier) =>
        calendar.id.includes(identifier),
      ),
  )

  return {
    calendars,
    isLoadingCalendars: isLoading,
  }
}

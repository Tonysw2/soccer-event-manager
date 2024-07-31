import { storageKeys } from '@/config/storageKeys'
import { ICalendar } from '@/interfaces/calendar'

import HttpClient from './http/httpClient'

interface ListCalendarsResponse {
  kind: string
  etag: string
  nextPageToken?: string
  nextSyncToken?: string
  items: ICalendar[]
}

export class GoogleCalendarApiServices {
  private static api = new HttpClient({
    baseURL: 'https://www.googleapis.com/calendar/v3',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(storageKeys.googleAccessToken)}`,
    },
  })

  static listCalendars = async ({ signal }: { signal?: AbortSignal }) => {
    const response = await this.api.get<ListCalendarsResponse>(
      '/users/me/calendarList',
      {
        signal,
      },
    )

    return response.data
  }
}

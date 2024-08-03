import { AxiosRequestConfig } from 'axios'

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

class GoogleCalendarApi {
  constructor() {
    this.api = new HttpClient({
      baseURL: 'https://www.googleapis.com/calendar/v3',
    })

    this.api.addRequestInterceptor((config) => {
      const accessToken = localStorage.getItem(storageKeys.googleAccessToken)

      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`)
      }

      return config
    })
  }

  private api = new HttpClient({
    headers: {
      Authorization: `Bearer ${localStorage.getItem(storageKeys.googleAccessToken)}`,
    },
  })

  async listCalendars(options: AxiosRequestConfig) {
    const response = await this.api.get<ListCalendarsResponse>(
      '/users/me/calendarList',
      options,
    )

    return response.data
  }

  async createEvent({ calendarId, data }: { calendarId: string; data: any }) {
    await this.api.post(`/calendars/${calendarId}/events`, data)
  }
}

export const GoogleCalendarApiServices = new GoogleCalendarApi()

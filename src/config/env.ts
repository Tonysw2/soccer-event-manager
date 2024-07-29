import { z } from 'zod'

const envSchema = z.object({
  VITE_GOOGLE_STATE: z.string(),
  VITE_GOOGLE_CLIENT_ID: z.string(),
  VITE_GOOGLE_REDIRECT_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)

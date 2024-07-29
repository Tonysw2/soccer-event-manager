import { createBrowserRouter, Navigate } from 'react-router-dom'

import { checkSecureRoute } from './lib/check-secure-route'
import { GoogleCallback } from './pages/google-callback'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/sign-in" />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/callbacks/google',
    element: <GoogleCallback />,
  },
  {
    path: '/home',
    element: <Home />,
    loader: checkSecureRoute,
  },
])

import { createBrowserRouter, Navigate } from 'react-router-dom'

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
    path: '/home',
    element: <Home />,
  },
])

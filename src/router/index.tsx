import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Admin from '@/pages/Admin'
import Home from '@/pages/Home'

const router = createBrowserRouter(
  [
    { path: '/admin', element: <Admin /> },
    { path: '/', element: <Home /> },
  ],
  { basename: process.env.PUBLIC_URL }
)

function RouterEntry(): RC {
  return <RouterProvider router={router} />
}

export default RouterEntry

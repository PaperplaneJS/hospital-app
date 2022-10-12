import Home from '@/pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([{ path: '/', element: <Home /> }])

function RouterEntry() {
  return <RouterProvider router={router} />
}

export default RouterEntry
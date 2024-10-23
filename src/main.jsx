import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Error from './pages/Error.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './layouts/Dashboard.jsx'
import Home from './pages/Home.jsx'
import User from './pages/User.jsx'
import Terminal from './pages/Terminal.jsx'
import AnnounceVessel from './pages/AnnounceVessel.jsx'

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'user',
            element: <User />
          },
          {
            path: 'terminal',
            element: <Terminal />
          },
          {
            path: 'announce/vessel',
            element: <AnnounceVessel />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

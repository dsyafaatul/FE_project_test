import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, defer, json, redirect, RouterProvider } from 'react-router-dom'
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
        async loader(){
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
            credentials: 'include'
          })
          if(!response.ok) return null
          return redirect('/dashboard')
        },
        async action({request}){
          const formData = await request.formData()
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
          })
          if(!response.ok) return json(await response.json())
          return redirect('/dashboard')
        },
        element: <Login />
      },
      {
        path: '/logout',
        async action(){
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            method: 'DELETE',
            credentials: 'include'
          })
          if(!response.ok) return null
          return redirect('/')
        }
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        async loader(){
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
            credentials: 'include'
          })
          if(!response.ok) return redirect('/')
          return await response.json()
        },
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'user',
            async loader({request}){
              const url = new URL(request.url)
              return defer({
                data: fetch(`${import.meta.env.VITE_API_URL}/user?q=${url.searchParams.get('q') || ''}`, {
                  credentials: 'include'
                }).then(response => response.json())
              })
            },
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

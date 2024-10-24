import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, defer, redirect, RouterProvider } from 'react-router-dom'
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
          if(!response.ok) return await response.json()
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
          if(!response.ok) return await response.json()
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
          if(!response.ok) return await response.json()
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
            errorElement: <Error />,
            children: [
              {
                index: true,
                element: <Home />
              },
              {
                path: 'user',
                async loader({request}){
                  const url = new URL(request.url)
                  const response = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/user?q=${url.searchParams.get('q') || ''}`, {
                      credentials: 'include'
                    }),
                    fetch(`${import.meta.env.VITE_API_URL}/terminal`, {
                      credentials: 'include'
                    })
                  ])
                  // if(!response.ok) throw await response.json()
                  return defer({
                    data: response[0].json(),
                    terminal: response[1].json(),
                  })
                },
                async action({request}){
                  const formData = await request.formData()
                  if(request.method === 'DELETE'){
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                      method: 'DELETE',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(Object.fromEntries(formData))
                    })
                    if(!response.ok) throw await response.json()
                    return await response.json()
                  }else
                  if(request.method === 'POST'){
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(Object.fromEntries(formData))
                    })
                    return {
                      ok: response.ok,
                      method: request.method,
                      response: await response.json()
                    }
                  }else
                  if(request.method === 'PUT'){
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                      method: 'PUT',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(Object.fromEntries(formData))
                    })
                    return {
                      ok: response.ok,
                      method: request.method,
                      response: await response.json()
                    }
                  }

                  throw new Response(null, {
                    status: 405,
                    statusText: 'Method Not Allowed'
                  })
                },
                element: <User />
              },
              {
                path: 'terminal',
                async loader({request}){
                  const url = new URL(request.url)
                  const response = await fetch(`${import.meta.env.VITE_API_URL}/terminal?q=${url.searchParams.get('q') || ''}`, {
                    credentials: 'include'
                  })
                  if(!response.ok) throw await response.json()
                  return defer({
                    data: response.json()
                  })
                },
                async action({request}){
                  const formData = await request.formData()
                  if(request.method === 'DELETE'){
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/terminal`, {
                      method: 'DELETE',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(Object.fromEntries(formData))
                    })
                    if(!response.ok) throw await response.json()
                    return await response.json()
                  }else
                  if(request.method === 'POST'){
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/terminal`, {
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(Object.fromEntries(formData))
                    })
                    return {
                      ok: response.ok,
                      method: request.method,
                      response: await response.json()
                    }
                  }else
                  if(request.method === 'PUT'){
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/terminal`, {
                      method: 'PUT',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(Object.fromEntries(formData))
                    })
                    return {
                      ok: response.ok,
                      method: request.method,
                      response: await response.json()
                    }
                  }

                  throw new Response(null, {
                    status: 405,
                    statusText: 'Method Not Allowed'
                  })
                },
                element: <Terminal />
              },
              {
                path: 'announce/vessel',
                async loader({request}){
                  const url = new URL(request.url)
                  const response = await fetch(`${import.meta.env.VITE_API_URL}/announce/vessel?q=${url.searchParams.get('q') || ''}`, {
                    credentials: 'include'
                  })
                  if(!response.ok) throw await response.json()
                  return defer({
                    data: response.json()
                  })
                },
                async action({request}){
                  const formData = await request.formData()
                  if(request.method === 'DELETE'){
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/announce/vessel`, {
                      method: 'DELETE',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(Object.fromEntries(formData))
                    })
                    if(!response.ok) throw await response.json()
                    return await response.json()
                  }

                  throw new Response(null, {
                    status: 405,
                    statusText: 'Method Not Allowed'
                  })
                },
                element: <AnnounceVessel />
              }
            ]
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

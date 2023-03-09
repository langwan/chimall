import MainLayout from '@/layout/main'
import NoLayout from '@/layout/no-layout'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Register from '@/pages/register'
import { RouteObject, useRoutes } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  },
  {
    path: '/r',
    element: <NoLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
]

export const AppRoutes = () => {
  const element = useRoutes([...routes])
  return <>{element}</>
}
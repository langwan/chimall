import MainLayout from '@/layout/main'
import NoLayout from '@/layout/no-layout'
import { GoodsPage } from '@/pages/goods'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import { RouteObject, useRoutes } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/goods/:id",
        element: <GoodsPage />
      }
    ]
  },
  {
    path: '/r',
    element: <NoLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
]

export const AppRoutes = () => {
  const element = useRoutes([...routes])
  return <>{element}</>
}
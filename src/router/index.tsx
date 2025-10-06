import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import Map from '../pages/Map'
import SimpleCalculator from '../pages/calculator/Simple'
import AdvancedCalculator from '../pages/calculator/Advanced'
import Settings from '../pages/Settings'
import Login from '../pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/map',
        element: <Map />,
      },
      {
        path: '/calculator/simple',
        element: <SimpleCalculator />,
      },
      {
        path: '/calculator/advanced',
        element: <AdvancedCalculator />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
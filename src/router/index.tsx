import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home'
import About from '../pages/about'
import Map from '../pages/map'
import SimpleCalculator from '../pages/calculator/simple'
import AdvancedCalculator from '../pages/calculator/advanced'
import Settings from '../pages/settings'
import Login from '../pages/login'

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
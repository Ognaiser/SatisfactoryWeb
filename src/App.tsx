import { Outlet } from 'react-router-dom'
import { Box, Toolbar } from '@mui/material'
import { useAppSelector, useAppDispatch } from './store/hooks'
import { closeDrawer } from './store/slices/drawerSlice'
import AppBar from './components/AppBar'
import NavigationDrawer from './components/NavigationDrawer'
import './App.css'

const drawerWidth = 280

function App() {
  const isDrawerOpen = useAppSelector((state) => state.drawer.isOpen)
  const dispatch = useAppDispatch()
  
  const handleCloseDrawer = () => dispatch(closeDrawer())

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar />

      {/* Navigation Drawer */}
      <NavigationDrawer 
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        width={drawerWidth}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
        <Outlet />
      </Box>
    </Box>
  )
}

export default App

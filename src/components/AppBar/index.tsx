import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material'
import {
  Menu as MenuIcon
} from '@mui/icons-material'
import { useAppDispatch } from '../../store/hooks'
import { toggleDrawer } from '../../store/slices/drawerSlice'
import ThemeToggle from '../ThemeToggle'
import AppBreadcrumbs from '../AppBreadcrumbs'
import UserMenu from './UserMenu'

export default function CustomAppBar() {
  const dispatch = useAppDispatch()
  
  const handleToggleDrawer = () => dispatch(toggleDrawer())

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#1976d2'
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleToggleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Logo */}
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <img 
            src="/header_logo.png" 
            alt="Satisfactory Tour Logo" 
            style={{ height: '32px', width: 'auto' }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h6" noWrap component="div">
            Satisfactory Tour
          </Typography>
          <AppBreadcrumbs />
        </Box>

        <UserMenu />
        
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  )
}
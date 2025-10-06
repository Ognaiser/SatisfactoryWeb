import { Outlet } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  ListItemAvatar
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Map as MapIcon,
  Calculate as CalculateIcon,
  Info as InfoIcon,
  ExpandLess,
  ExpandMore,
  Functions,
  Calculate,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDrawerState, useDrawerToggle, useDrawerClose } from './store/hooks'
import ThemeToggle from './components/ThemeToggle'
import AppBreadcrumbs from './components/AppBreadcrumbs'
import './App.css'

const drawerWidth = 280

function App() {
  const location = useLocation()
  const isDrawerOpen = useDrawerState()
  const toggleDrawer = useDrawerToggle()
  const closeDrawer = useDrawerClose()
  const [calculatorOpen, setCalculatorOpen] = useState(true)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)

  const handleCalculatorToggle = () => {
    setCalculatorOpen(!calculatorOpen)
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Map', icon: <MapIcon />, path: '/map' },
  ]

  const calculatorItems = [
    { text: 'Simple', icon: <Calculate />, path: '/calculator/simple' },
    { text: 'Advanced', icon: <Functions />, path: '/calculator/advanced' },
  ]

  const aboutItem = { text: 'About', icon: <InfoIcon />, path: '/about' }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
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
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo */}
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo.svg" 
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

          {/* User Widget */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
            <Chip 
              avatar={<Avatar sx={{ width: 24, height: 24 }}>U</Avatar>}
              label="User"
              variant="outlined"
              clickable
              onClick={handleUserMenuOpen}
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            />
          </Box>

          {/* User Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem sx={{ minWidth: 200 }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
              </ListItemAvatar>
              <Box>
                <Typography variant="subtitle2">John Doe</Typography>
                <Typography variant="caption" color="text.secondary">
                  john.doe@example.com
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to="/settings">
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem component={Link} to="/login">
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
          
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
        
        {/* Logo in Drawer */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <img 
            src="/logo.svg" 
            alt="Satisfactory Tour Logo" 
            style={{ height: '40px', width: 'auto' }}
          />
        </Box>

        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={closeDrawer}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Calculator Section */}
          <List>
            <ListItemButton onClick={handleCalculatorToggle}>
              <ListItemIcon>
                <CalculateIcon />
              </ListItemIcon>
              <ListItemText primary="Calculator" />
              {calculatorOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={calculatorOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {calculatorItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component={Link}
                      to={item.path}
                      onClick={closeDrawer}
                      selected={location.pathname === item.path}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={aboutItem.path}
                onClick={closeDrawer}
                selected={location.pathname === aboutItem.path}
              >
                <ListItemIcon>{aboutItem.icon}</ListItemIcon>
                <ListItemText primary={aboutItem.text} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

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

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'
import { useDrawerToggle } from '../store/hooks'
import ThemeToggle from './ThemeToggle'
import AppBreadcrumbs from './AppBreadcrumbs'

export default function CustomAppBar() {
  const toggleDrawer = useDrawerToggle()
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

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
          onClick={toggleDrawer}
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
  )
}
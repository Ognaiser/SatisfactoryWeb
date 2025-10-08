import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button
} from '@mui/material'
import {
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logoutUser } from '../../store/slices/userSlice'

export default function UserMenu() {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    handleUserMenuClose()
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // If no user is logged in, show login button
  if (!user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          startIcon={<LoginIcon />}
          sx={{ 
            color: 'white', 
            borderColor: 'rgba(255,255,255,0.3)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.5)'
            }
          }}
        >
          Login
        </Button>
      </Box>
    )
  }

  return (
    <>
      {/* User Widget */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
        <Chip 
          avatar={
            <Avatar sx={{ width: 24, height: 24 }}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%' }} />
              ) : (
                getInitials(user.name)
              )}
            </Avatar>
          }
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
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%' }} />
              ) : (
                getInitials(user.name)
              )}
            </Avatar>
          </ListItemAvatar>
          <Box>
            <Typography variant="subtitle2">{user.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
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
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@mui/material'
import {
  Home as HomeIcon,
  Map as MapIcon,
  Calculate as CalculateIcon,
  Info as InfoIcon,
  ExpandLess,
  ExpandMore,
  Functions,
  Calculate,
} from '@mui/icons-material'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavigationDrawerProps {
  open: boolean
  onClose: () => void
  width: number
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

export default function NavigationDrawer({ open, onClose, width }: NavigationDrawerProps) {
  const location = useLocation()
  const [calculatorOpen, setCalculatorOpen] = useState(true)

  const handleCalculatorToggle = () => {
    setCalculatorOpen(!calculatorOpen)
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, #2d2d2d 0%, #1e1e1e 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          borderRight: (theme) => theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '4px 0 20px rgba(0, 0, 0, 0.3)'
            : '4px 0 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
      
      {/* Logo in Drawer */}
      <Box sx={{ 
        p: 0, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center', 
        borderBottom: (theme) => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(25, 118, 210, 0.02)',
        mb: 0.5,
        minHeight: 60
      }}>
        <img 
          src="/bar_logo.png" 
          alt="Satisfactory Tour Logo" 
          style={{ 
            height: '150ppx', 
            width: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        />
      </Box>

      <Box sx={{ overflow: 'auto', px: 0.5 }}>
        <List sx={{ py: 0.5 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={onClose}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  mx: 0.5,
                  minHeight: 40,
                  py: 0.75,
                  transition: 'all 0.15s ease-in-out',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(25, 118, 210, 0.06)',
                    transform: 'translateX(2px)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                      ? 'rgba(144, 202, 249, 0.12)'
                      : 'rgba(25, 118, 210, 0.1)',
                    borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(144, 202, 249, 0.16)'
                        : 'rgba(25, 118, 210, 0.14)',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 36,
                  color: location.pathname === item.path ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    fontSize: '0.9rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ 
          mx: 1.5, 
          my: 1,
          borderColor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)'
        }} />

        {/* Calculator Section */}
        <List sx={{ py: 0 }}>
          <ListItemButton 
            onClick={handleCalculatorToggle}
            sx={{
              borderRadius: 1,
              mx: 0.5,
              minHeight: 40,
              py: 0.75,
              transition: 'all 0.15s ease-in-out',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.06)'
                  : 'rgba(25, 118, 210, 0.06)',
                transform: 'translateX(2px)',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CalculateIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Calculator"
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: '0.9rem'
              }}
            />
            {calculatorOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={calculatorOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {calculatorItems.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                  <ListItemButton
                    sx={{ 
                      pl: 3.5,
                      borderRadius: 1,
                      mx: 0.5,
                      minHeight: 36,
                      py: 0.5,
                      transition: 'all 0.15s ease-in-out',
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'rgba(25, 118, 210, 0.06)',
                        transform: 'translateX(2px)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                          ? 'rgba(144, 202, 249, 0.12)'
                          : 'rgba(25, 118, 210, 0.1)',
                        borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.mode === 'dark'
                            ? 'rgba(144, 202, 249, 0.16)'
                            : 'rgba(25, 118, 210, 0.14)',
                        }
                      }
                    }}
                    component={Link}
                    to={item.path}
                    onClick={onClose}
                    selected={location.pathname === item.path}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: 32,
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary'
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        fontSize: '0.85rem'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>

        <Divider sx={{ 
          mx: 1.5, 
          my: 1,
          borderColor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)'
        }} />

        <List sx={{ py: 0.5 }}>
          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              component={Link}
              to={aboutItem.path}
              onClick={onClose}
              selected={location.pathname === aboutItem.path}
              sx={{
                borderRadius: 1,
                mx: 0.5,
                minHeight: 40,
                py: 0.75,
                transition: 'all 0.15s ease-in-out',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.06)'
                    : 'rgba(25, 118, 210, 0.06)',
                  transform: 'translateX(2px)',
                },
                '&.Mui-selected': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(144, 202, 249, 0.12)'
                    : 'rgba(25, 118, 210, 0.1)',
                  borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                      ? 'rgba(144, 202, 249, 0.16)'
                      : 'rgba(25, 118, 210, 0.14)',
                  }
                }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 36,
                color: location.pathname === aboutItem.path ? 'primary.main' : 'inherit'
              }}>
                {aboutItem.icon}
              </ListItemIcon>
              <ListItemText 
                primary={aboutItem.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === aboutItem.path ? 600 : 500,
                  fontSize: '0.9rem'
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
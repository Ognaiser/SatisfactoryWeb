import { Breadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { 
  Home as HomeIcon,
  Map as MapIcon,
  Calculate as CalculateIcon,
  Info as InfoIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'

interface BreadcrumbItem {
  label: string
  path?: string
  icon?: React.ReactNode
}

const routeMap: Record<string, BreadcrumbItem[]> = {
  '/': [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> }
  ],
  '/map': [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> },
    { label: 'Map', icon: <MapIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> }
  ],
  '/calculator/simple': [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> },
    { label: 'Calculator', icon: <CalculateIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> },
    { label: 'Simple' }
  ],
  '/calculator/advanced': [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> },
    { label: 'Calculator', icon: <CalculateIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> },
    { label: 'Advanced' }
  ],
  '/about': [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> },
    { label: 'About', icon: <InfoIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> }
  ],
  '/settings': [
    { label: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> },
    { label: 'Settings', icon: <SettingsIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> }
  ]
}

export default function AppBreadcrumbs() {
  const location = useLocation()
  const breadcrumbs = routeMap[location.pathname] || []

  if (breadcrumbs.length <= 1) {
    return null // Don't show breadcrumbs for home page or unknown routes
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ 
        color: 'rgba(255, 255, 255, 0.7)',
        '& .MuiBreadcrumbs-separator': {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }}
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        
        if (isLast || !crumb.path) {
          return (
            <Typography
              key={crumb.label}
              color="inherit"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: '0.875rem',
                fontWeight: isLast ? 500 : 400
              }}
            >
              {crumb.icon}
              {crumb.label}
            </Typography>
          )
        }

        return (
          <Link
            key={crumb.label}
            component={RouterLink}
            to={crumb.path}
            color="inherit"
            underline="hover"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '0.875rem'
            }}
          >
            {crumb.icon}
            {crumb.label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
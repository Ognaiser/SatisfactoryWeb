import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Container,
  Paper,
  Avatar
} from '@mui/material'
import {
  Map as MapIcon,
  Calculate as CalculateIcon,
  Explore as ExploreIcon,
  Engineering as EngineeringIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

const featureCards = [
  {
    title: 'Interactive Map',
    description: 'Explore the Satisfactory world with our detailed interactive map. Discover resource locations, plan your factory layouts, and optimize your logistics networks.',
    icon: <MapIcon sx={{ fontSize: 40 }} />,
    color: '#4caf50',
    path: '/map',
    buttonText: 'Explore Map'
  },
  {
    title: 'Production Calculator',
    description: 'Calculate optimal production chains, resource requirements, and factory layouts. Plan your industrial empire with precision.',
    icon: <CalculateIcon sx={{ fontSize: 40 }} />,
    color: '#2196f3',
    path: '/calculator/simple',
    buttonText: 'Start Calculating'
  },
  {
    title: 'Advanced Planning',
    description: 'Access advanced tools for complex production planning, multi-factory optimization, and resource flow analysis.',
    icon: <EngineeringIcon sx={{ fontSize: 40 }} />,
    color: '#ff9800',
    path: '/calculator/advanced',
    buttonText: 'Advanced Tools'
  }
]

const stats = [
  { label: 'Resources Tracked', value: '50+', icon: <ExploreIcon /> },
  { label: 'Production Chains', value: '200+', icon: <TrendingUpIcon /> },
  { label: 'Map Locations', value: '1000+', icon: <MapIcon /> }
]

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Welcome to Satisfactory Tour
        </Typography>
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          Your ultimate companion for factory planning, resource management, and world exploration in Satisfactory
        </Typography>

        {/* Stats */}
        <Grid container spacing={4} sx={{ mb: 4, justifyContent: 'center' }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(25, 118, 210, 0.05)',
                  borderRadius: 2
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 56, 
                    height: 56, 
                    mx: 'auto', 
                    mb: 2 
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Feature Cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {featureCards.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              elevation={4}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 12px 40px rgba(0, 0, 0, 0.3)'
                    : '0 12px 40px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: feature.color, 
                      width: 64, 
                      height: 64, 
                      mr: 2 
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    {feature.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
                
                <Button
                  component={Link}
                  to={feature.path}
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  {feature.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 6, 
          textAlign: 'center',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(144, 202, 249, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(144, 202, 249, 0.05) 100%)',
          borderRadius: 3
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Ready to Build Your Factory Empire?
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
        >
          Start planning your next mega-factory with our comprehensive tools and resources
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/map"
            variant="contained"
            size="large"
            startIcon={<MapIcon />}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Explore World Map
          </Button>
          <Button
            component={Link}
            to="/calculator/simple"
            variant="outlined"
            size="large"
            startIcon={<CalculateIcon />}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Start Planning
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
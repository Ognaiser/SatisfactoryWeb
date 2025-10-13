import { Typography, Paper, Box } from '@mui/material'
import InteractiveMap from './V2InteractiveMap'

const MapPage = () => {
  return (
    <Box
      sx={{
        pt: { xs: 2, md: 4 },
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        px: { xs: 2, md: 4 },
        pb: { xs: 2, md: 4 },
        minHeight: 0,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Satisfactory World Map
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          Interactive map showing resource nodes, power slugs, and points of
          interest across the Satisfactory world.
        </Typography>
      </Box>
      <Paper
        elevation={2}
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 2,
          minHeight: 0,
        }}
      >
        <InteractiveMap />
      </Paper>
    </Box>
  )
}

export default MapPage

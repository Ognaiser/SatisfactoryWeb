import { Typography, Paper, Box } from '@mui/material'
import InteractiveMap from './V2InteractiveMap'

const MapPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Satisfactory World Map
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Interactive map showing resource nodes, power slugs, and points of
        interest across the Satisfactory world.
      </Typography>
      <Paper elevation={2} sx={{ overflow: 'hidden', borderRadius: 2 }}>
        <InteractiveMap />
      </Paper>
    </Box>
  )
}

export default MapPage
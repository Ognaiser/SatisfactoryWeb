import {
  Typography,
  Card,
  CardContent,
  Box,
  Paper
} from '@mui/material'
import { Map as MapIcon } from '@mui/icons-material'

export default function Map() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MapIcon sx={{ mr: 2, fontSize: '2rem' }} />
        <Typography variant="h3" component="h1">
          Interactive Map
        </Typography>
      </Box>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography variant="body1" paragraph>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sed ut perspiciatis unde omnis
        </Typography>
        <Typography variant="body2">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas 
          sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
          voluptatem sequi nesciunt.
        </Typography>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Feature 1
            </Typography>
            <Typography variant="body2">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
              praesentium voluptatum deleniti atque corrupti quos dolores.
            </Typography>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Feature 2
            </Typography>
            <Typography variant="body2">
              Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, 
              cum soluta nobis est eligendi optio cumque nihil impedit.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
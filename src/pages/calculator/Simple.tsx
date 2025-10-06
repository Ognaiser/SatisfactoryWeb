import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
  Alert
} from '@mui/material'
import { Calculate } from '@mui/icons-material'

export default function SimpleCalculator() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Calculate sx={{ mr: 2, fontSize: '2rem' }} />
        <Typography variant="h3" component="h1">
          Simple Calculator
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        This is a placeholder for the Simple Calculator interface
      </Alert>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Basic Operations
              </Typography>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula 
                leo vel nunc tempus, in sodales nunc tincidunt. Sed cursus, ipsum vel 
                efficitur vehicula, nulla nunc faucibus nunc, at tempus nulla nunc vel nunc.
              </Typography>
              <Typography variant="body1" paragraph>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
                cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper 
                sit amet ligula.
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }}>
                Start Calculation
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Quick Reference
              </Typography>
              <Typography variant="body2" paragraph>
                • Addition and Subtraction
              </Typography>
              <Typography variant="body2" paragraph>
                • Multiplication and Division
              </Typography>
              <Typography variant="body2" paragraph>
                • Basic Functions
              </Typography>
              <Typography variant="body2" paragraph>
                • Memory Operations
              </Typography>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, 
                eget tincidunt nibh pulvinar a. Pellentesque habitant morbi tristique senectus 
                et netus et malesuada fames ac turpis egestas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calculator Interface Preview
              </Typography>
              <Typography variant="body1" paragraph>
                Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non 
                curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at 
                risus viverra adipiscing at in tellus integer feugiat scelerisque varius 
                morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi 
                non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar 
                etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
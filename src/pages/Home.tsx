import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  ButtonGroup,
  Chip
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import type { RootState, AppDispatch } from '../store'
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice'

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome Home
      </Typography>
      
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Redux Counter Example
          </Typography>
          
          <Box sx={{ textAlign: 'center', my: 3 }}>
            <Chip 
              label={`Count: ${count}`} 
              color="primary" 
              size="medium"
              sx={{ fontSize: '1.2rem', p: 2, height: 'auto' }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <ButtonGroup variant="contained" size="large">
              <Button 
                startIcon={<Remove />}
                onClick={() => dispatch(decrement())}
              >
                Decrement
              </Button>
              <Button 
                startIcon={<Add />}
                onClick={() => dispatch(increment())}
              >
                Increment
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => dispatch(incrementByAmount(5))}
            >
              Add 5
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
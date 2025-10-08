import {
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
  Link as MuiLink,
  Grid
} from '@mui/material'
import { 
  Login as LoginIcon,
  Google as GoogleIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAlert(true)
    // Login logic would go here
    console.log('Login attempt:', { email, password, rememberMe })
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login attempt`)
    setShowAlert(true)
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo and Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img 
              src="/logo.png" 
              alt="Satisfactory Tour Logo" 
              style={{ height: '48px', width: 'auto', marginBottom: '16px' }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account to continue
            </Typography>
          </Box>

          {showAlert && (
            <Alert severity="info" sx={{ mb: 2 }}>
              This is a demo login page. Authentication is not implemented.
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <MuiLink href="#" variant="body2">
                Forgot your password?
              </MuiLink>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }}>or</Divider>

          {/* Social Login */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('Google')}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                onClick={() => handleSocialLogin('GitHub')}
              >
                GitHub
              </Button>
            </Grid>
          </Grid>

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <MuiLink href="#" variant="body2">
                Sign up here
              </MuiLink>
            </Typography>
          </Box>

          {/* Back to App */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              component={Link}
              to="/"
              variant="text"
              size="small"
            >
              ← Back to App
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
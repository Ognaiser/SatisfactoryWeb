import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeMode, useThemeToggle } from '../store/hooks'

export default function ThemeToggle() {
  const mode = useThemeMode()
  const handleToggle = useThemeToggle()

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton 
        onClick={handleToggle} 
        color="inherit"
        sx={{ ml: 1 }}
      >
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  )
}
import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { toggleTheme } from '../../store/slices/themeSlice'

export default function ThemeToggle() {
  const mode = useAppSelector((state) => state.theme.mode)
  const dispatch = useAppDispatch()
  
  const handleToggle = () => dispatch(toggleTheme())

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
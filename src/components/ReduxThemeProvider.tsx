import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import type { RootState, AppDispatch } from '../store'
import { setTheme } from '../store/slices/themeSlice'

interface ReduxThemeProviderProps {
  children: ReactNode
}

export const ReduxThemeProvider = ({ children }: ReduxThemeProviderProps) => {
  const mode = useSelector((state: RootState) => state.theme.mode)
  const dispatch = useDispatch<AppDispatch>()

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('themeMode')) {
        dispatch(setTheme(e.matches ? 'dark' : 'light'))
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [dispatch])

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
      },
      background: {
        default: mode === 'light' ? '#fafafa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
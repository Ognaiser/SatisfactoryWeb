import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import type { RootState, AppDispatch } from '../../store'
import { setTheme } from '../../store/slices/themeSlice'

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
      ...(mode === 'dark'
        ? {
            // 🌑 DARK MODE
            primary: {
              main: '#ff8c42',
              light: '#ffa867',
              dark: '#c66a2f',
            },
            secondary: {
              main: '#4cc9f0',
              light: '#72d4f5',
              dark: '#3aa7c2',
            },
            background: {
              default: '#1e1e20',
              paper: '#2a2a2d',
            },
            text: {
              primary: '#f4f4f5',
              secondary: '#a3a3a8',
            },
          }
        : {
            // ☀️ LIGHT MODE
            primary: {
              main: '#e6752c',
              light: '#ff984f',
              dark: '#a7521c',
            },
            secondary: {
              main: '#3a9bdc',
              light: '#6fc4f2',
              dark: '#2b79ad',
            },
            background: {
              default: '#f5f5f7',
              paper: '#ffffff',
            },
            text: {
              primary: '#1a1a1c',
              secondary: '#55565a',
            },
          }),
      success: { main: '#8be78b' },
      warning: { main: '#ffb347' },
      error: { main: '#ff5c5c' },
      info: { main: '#5ec6f3' },
    },
    typography: {
      fontFamily: "'Orbitron', 'Rajdhani', 'Roboto', sans-serif",
      h1: { fontWeight: 700, letterSpacing: 1 },
      h2: { fontWeight: 600, letterSpacing: 0.5 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
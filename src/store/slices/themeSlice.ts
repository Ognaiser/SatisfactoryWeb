import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
}

// Initialize theme from localStorage or system preference
const getInitialTheme = (): ThemeMode => {
  const savedMode = localStorage.getItem('themeMode')
  if (savedMode) {
    return savedMode as ThemeMode
  }
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light'
      state.mode = newMode
      localStorage.setItem('themeMode', newMode)
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      localStorage.setItem('themeMode', action.payload)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
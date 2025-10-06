import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'
import { toggleTheme } from './slices/themeSlice'
import { toggleDrawer, openDrawer, closeDrawer } from './slices/drawerSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Theme-specific hooks for convenience
export const useThemeMode = () => useAppSelector((state) => state.theme.mode)
export const useThemeToggle = () => {
  const dispatch = useAppDispatch()
  return () => dispatch(toggleTheme())
}

// Drawer-specific hooks for convenience
export const useDrawerState = () => useAppSelector((state) => state.drawer.isOpen)
export const useDrawerToggle = () => {
  const dispatch = useAppDispatch()
  return () => dispatch(toggleDrawer())
}
export const useDrawerOpen = () => {
  const dispatch = useAppDispatch()
  return () => dispatch(openDrawer())
}
export const useDrawerClose = () => {
  const dispatch = useAppDispatch()
  return () => dispatch(closeDrawer())
}
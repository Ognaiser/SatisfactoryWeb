import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './slices/themeSlice'
import drawerSlice from './slices/drawerSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    drawer: drawerSlice,
    user: userSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
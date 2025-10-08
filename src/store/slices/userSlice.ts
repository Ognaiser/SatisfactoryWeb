import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserState {
  user: UserData | undefined
  isAuthenticated: boolean
}

// Initialize user from localStorage if exists
const getInitialUser = (): UserData | undefined => {
  const savedUser = localStorage.getItem('userData')
  if (savedUser) {
    try {
      return JSON.parse(savedUser) as UserData
    } catch {
      // If parsing fails, remove invalid data
      localStorage.removeItem('userData')
    }
  }
  return undefined
}

const initialState: UserState = {
  user: getInitialUser(),
  isAuthenticated: !!getInitialUser(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload
      state.isAuthenticated = true
      // Persist to localStorage
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    logoutUser: (state) => {
      state.user = undefined
      state.isAuthenticated = false
      // Remove from localStorage
      localStorage.removeItem('userData')
    },
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        // Update localStorage
        localStorage.setItem('userData', JSON.stringify(state.user))
      }
    },
  },
})

export const { loginUser, logoutUser, updateUser } = userSlice.actions
export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import loadState from '../../app/storage'

const persistedAuth = loadState('auth', { users: [], currentUser: null })

const slice = createSlice({
  name: 'auth',
  initialState: {
    users: persistedAuth.users ?? [],
    currentUser: persistedAuth.currentUser ?? null,
  },
  reducers: {
    register(state, action) {
      state.users.push(action.payload)
      state.currentUser = action.payload
    },
    login(state, action) {
      state.currentUser = action.payload
    },
    logout(state) {
      state.currentUser = null
    },
  },
})

export const { register, login, logout } = slice.actions

export const selectUsers = (state) => state.auth.users
export const selectCurrentUser = (state) => state.auth.currentUser
export const selectIsLoggedIn = (state) => state.auth.currentUser !== null

export default slice.reducer
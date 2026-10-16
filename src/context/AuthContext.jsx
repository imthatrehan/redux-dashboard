import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', [])
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {})
  const isLoggedIn = Object.keys(currentUser ?? {}).length > 0
  const logout = () => setCurrentUser({})

  return (
    <AuthContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser, isLoggedIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
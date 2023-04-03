import React, { createContext, useCallback, useContext, useState } from 'react'
import { api } from '../api/axios'
import { AuthState, Credentials, Props, User } from '../commons/types'

type AuthContextData = {
  user: User
  signIn(credentials: Credentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MinhasContas:token')
    const user = localStorage.getItem('@MinhasContas:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async (credentials: Credentials) => {
    const response = await api.post('/authenticate', {
      email: credentials.email,
      password: credentials.password,
    })
    const { token, user } = response.data
    localStorage.setItem('@MinhasContas:token', token)
    localStorage.setItem('@MinhasContas:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user))

      setData({
        token: data.token,
        user,
      })
    },
    [setData, data.token],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

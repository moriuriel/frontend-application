import React from 'react'
import { Props } from '../commons/types'
import { AuthProvider } from './auth'

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)

export default AppProvider

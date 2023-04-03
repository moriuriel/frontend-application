import React from 'react'

export type User = {
  name: string
  email: string
}

export type AuthState = {
  token: string
  user: User
}

export type Credentials = {
  email: string
  password: string
}

export interface Props {
  children: React.ReactNode
}

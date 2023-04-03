import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

interface Props {
  component: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const { user } = useAuth()

  if (user) {
    return <RouteComponent />
  }

  return <Navigate to="/" />
}

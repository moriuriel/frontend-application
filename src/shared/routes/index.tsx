import { Route, Routes } from 'react-router-dom'
import { Header } from '../../components/Header'
import { SignIn } from '../../modules/signIn'
import { SignUp } from '../../modules/signUp'
import { PrivateRoute } from './Route'

function Router() {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={<PrivateRoute path="dashboard" component={Header} />}
      />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export { Router }

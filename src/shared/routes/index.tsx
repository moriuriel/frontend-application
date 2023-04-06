import { Route, Routes } from 'react-router-dom'
import { Cards } from '../../modules/cards'
import { SignIn } from '../../modules/signIn'
import { SignUp } from '../../modules/signUp'
import { PrivateRoute } from './Route'

function Router() {
  return (
    <Routes>
      <Route
        path="/cartoes"
        element={<PrivateRoute path="dashboard" component={Cards} />}
      />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export { Router }

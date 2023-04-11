import { Route, Routes } from 'react-router-dom'
import { Cards } from '../../modules/cards'
import { Categories } from '../../modules/categories'
import { Dashboard } from '../../modules/dashboard'
import { SignIn } from '../../modules/signIn'
import { SignUp } from '../../modules/signUp'
import { PrivateRoute } from './Route'

function Router() {
  return (
    <Routes>
      <Route
        path="/cartoes"
        element={<PrivateRoute path="/cartoes" component={Cards} />}
      />
       <Route
        path="/dashboard"
        element={<PrivateRoute path="/dashboard" component={Dashboard} />}
      />
      <Route
        path="/categorias"
        element={<PrivateRoute path="/categorias" component={Categories} />}
      />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export { Router }

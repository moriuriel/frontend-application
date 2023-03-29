import { BrowserRouter } from 'react-router-dom'
import { Router } from './shared/routes'

function App() {
  return (
    <main>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </main>
  )
}

export default App

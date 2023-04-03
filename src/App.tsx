import { BrowserRouter } from 'react-router-dom'
import AppProvider from './hooks'
import { Router } from './shared/routes'

function App() {
  return (
    <main>
      <BrowserRouter>
        <AppProvider>
          <Router />
        </AppProvider>
      </BrowserRouter>
    </main>
  )
}

export default App

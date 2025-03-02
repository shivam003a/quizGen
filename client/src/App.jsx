import './App.css'
import { Route, Routes } from 'react-router'
import { Suspense, lazy } from 'react'
import Loading from './components/Loading'
import Dashboard from './components/Dashboard'
import Create from './components/Create'
import Main from './pages/Main'

// Lazy loading components
const Landing = lazy(() => import('./pages/Landing'))
const Auth = lazy(() => import('./pages/Auth'))
const Quiz = lazy(() => import('./components/Quiz'))

function App() {
  return (
    <Suspense
      fallback={<div>
        <Loading
          full={true}
          large={true}
        />
      </div>}>
      <Routes>
        <Route index element={<Landing />} />
        <Route path='/signin' element={<Auth type="signin" />} />
        <Route path='/signup' element={<Auth type="signup" />} />
        <Route path='/q/list' element={<Main type="list" />} />
        <Route path='/q/dashboard' element={<Main type="dashboard" />} />
        <Route path='/q/create' element={<Main type="create" />} />
      </Routes>
    </Suspense>
  )
}

export default App

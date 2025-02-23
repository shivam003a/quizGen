import './App.css'
import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
      </Routes>
    </>
  )
}

export default App

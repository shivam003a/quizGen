import './App.css';
import { Route, Routes, Outlet } from 'react-router';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading';

// Lazy loading components
const Landing = lazy(() => import('./pages/Landing'));
const Auth = lazy(() => import('./pages/Auth'));
const Main = lazy(() => import('./pages/Main'));
const CreateUsingAi = lazy(() => import('./components/CreateUsingAi'));
const CreateUsingManual = lazy(() => import('./components/CreateUsingManual'));
const Header = lazy(() => import('./components/Header'))
const Navigation = lazy(() => import('./components/Navigation'))

// Layout component for nested routes under `/q`
function QLayout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* This renders the nested routes */}
      <Navigation />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div><Loading full={true} large={true} /></div>}
    >
      <div className='overflow-x-hidden'>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/signin" element={<Auth type="signin" />} />
          <Route path="/signup" element={<Auth type="signup" />} />

          <Route path="/q" element={<QLayout />}>
            <Route path="list" element={<Main type="list" />} />
            <Route path="dashboard" element={<Main type="dashboard" />} />
            <Route path="create" element={<Main type="create" />} />
            <Route path="create/ai" element={<CreateUsingAi />} />
            <Route path="create/manual" element={<CreateUsingManual />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
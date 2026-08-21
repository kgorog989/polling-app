import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './pages/header/Header'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/auth/signup/Signup'
import Login from './pages/auth/login/Login'
import Dashboard from './user/dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

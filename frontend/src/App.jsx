// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard';
import RegisterPage from './components/RegisterPage';
import Company from './components/Company';
import LoginPage from './components/LoginPage';
import NgoPage from './components/NgoPage';
import Cards from './components/Cards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>  
      <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ngo" element={<NgoPage />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/company" element={<Company/>} />
      </Routes>
    </Router>
  )
}

export default App

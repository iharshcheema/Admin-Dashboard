import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Info from './components/Info'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  )
}

export default App

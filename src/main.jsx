import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { DashboardProvider } from './context/DashboardContext'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <DashboardProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DashboardProvider>
    </ChakraProvider>
  </StrictMode>
)

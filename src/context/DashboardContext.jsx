// src/context/DashboardContext.js
import React, { createContext, useState, useEffect, useContext } from 'react'

// Define the initial data
const initialData = {
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 1,
          name: 'Widget 1',
          text: 'This is widget 1 in CSPM Executive Dashboard',
        },
      ],
    },
    {
      name: 'CWPP Dashboard',
      widgets: [
        { id: 1, name: 'Widget 1', text: 'This is widget 1 in CWPP Dashboard' },
      ],
    },
    {
      name: 'Registry Scan',
      widgets: [
        { id: 1, name: 'Widget 1', text: 'This is widget 1 in Registry Scan' },
      ],
    },
  ],
}

// Create the context
const DashboardContext = createContext()

// Custom hook to use the context
export const useDashboard = () => {
  return useContext(DashboardContext)
}

// Provider component
export const DashboardProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('dashboardData')
    return savedData ? JSON.parse(savedData) : initialData
  })

  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(data))
  }, [data])

  return (
    <DashboardContext.Provider value={{ data, setData }}>
      {children}
    </DashboardContext.Provider>
  )
}

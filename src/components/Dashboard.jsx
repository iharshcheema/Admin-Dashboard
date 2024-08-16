import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-80 ">
        <Content />
      </div>
    </div>
  )
}

export default Dashboard

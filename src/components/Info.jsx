import React from 'react'
import Sidebar from './Sidebar'
import { Text } from '@chakra-ui/react'
const Info = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-80 ">
        <Text mt={40} className="text-center" fontSize="xl">
          An admin Dashboard to manage{' '}
          <span className="px-2 text-cyan-500"> widgets </span> which can be
          used as an boiler-plate for any{' '}
          <span className="px-2 text-cyan-500"> MERN Admin Dashboard</span> .
        </Text>
      </div>
    </div>
  )
}

export default Info

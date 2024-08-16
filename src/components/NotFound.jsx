import React from 'react'
import Sidebar from './Sidebar'
import { Text } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-80 ">
        <Text mt={40} className="text-center" fontSize="xl">
          <span className="px-2 text-cyan-500"> 404 ! </span>
          NOT FOUND
        </Text>
      </div>
    </div>
  )
}

export default NotFound

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Flex,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  ChatIcon,
  AddIcon,
  EditIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons'

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation()

  const linkStyle = (path) => ({
    color: location.pathname === path ? 'teal.500' : 'gray.500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: 'sm',
  })

  return (
    <>
      <div>
        {/* Hamburger Button for Small Screens */}
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Sidebar"
          display={{ base: 'block', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          size="lg"
          colorScheme="blue"
        />

        {/* Sidebar for Larger Screens */}
        <Flex
          pos={'fixed'}
          h={'100vh'}
          w={'200px'}
          flexDirection={'column'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          border={'1px solid gray'}
          display={{ base: 'none', md: 'flex' }}
          boxShadow={'0 4px 12px 0 rgba(0,0,0,0.5) '}
          gap={6}
          paddingTop={8}
        >
          <Link to="/" style={linkStyle('/')}>
            <EditIcon
              marginRight={2}
              color={location.pathname === '/' ? 'teal.500' : 'gray.500'}
            />
            Edit Widgets
          </Link>
          <Link to="/info" style={linkStyle('/info')}>
            <InfoOutlineIcon
              marginRight={2}
              color={location.pathname === '/info' ? 'teal.500' : 'gray.500'}
            />
            Info
          </Link>
        </Flex>

        {/* Drawer for Small Screens */}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={6}
                paddingTop={8}
              >
                <Link to="/" onClick={onClose} style={linkStyle('/')}>
                  <EditIcon
                    marginRight={2}
                    color={location.pathname === '/' ? 'teal.500' : 'gray.500'}
                  />
                  Edit Widgets
                </Link>
                <Link to="/info" onClick={onClose} style={linkStyle('/info')}>
                  <InfoOutlineIcon
                    marginRight={2}
                    color={
                      location.pathname === '/info' ? 'teal.500' : 'gray.500'
                    }
                  />
                  Info
                </Link>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </div>
    </>
  )
}

export default Sidebar

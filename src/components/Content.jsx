import React, { useState } from 'react'
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Checkbox,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { useDashboard } from '../context/DashboardContext'

const Content = () => {
  const { data, setData } = useDashboard()
  const [showManageWidget, setShowManageWidget] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [newWidgetName, setNewWidgetName] = useState('')
  const [newWidgetText, setNewWidgetText] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleCategory = (categoryName) => {
    const updatedData = { ...data }
    const category = updatedData.categories.find(
      (cat) => cat.name === categoryName
    )
    if (category) {
      category.hidden = !category.hidden
      setData(updatedData)
    }
  }

  const toggleWidget = (categoryName, widgetId) => {
    const updatedData = { ...data }
    const category = updatedData.categories.find(
      (cat) => cat.name === categoryName
    )
    if (category) {
      const widget = category.widgets.find((w) => w.id === widgetId)
      if (widget) widget.hidden = !widget.hidden
      setData(updatedData)
    }
  }

  const addWidget = () => {
    const updatedData = { ...data }
    const category = updatedData.categories.find(
      (cat) => cat.name === selectedCategory
    )
    if (category) {
      category.widgets.push({
        id: Date.now(),
        name: newWidgetName || `Widget ${category.widgets.length + 1}`,
        text: newWidgetText,
      })
      setData(updatedData)
      setNewWidgetName('')
      setNewWidgetText('')
      onClose()
    }
  }

  const openAddWidgetModal = (categoryName) => {
    setSelectedCategory(categoryName)
    onOpen()
  }

  const removeWidget = (categoryName, widgetId) => {
    const updatedData = { ...data }
    const category = updatedData.categories.find(
      (cat) => cat.name === categoryName
    )
    if (category) {
      category.widgets = category.widgets.filter((w) => w.id !== widgetId)
      setData(updatedData)
    }
  }

  return (
    <VStack spacing={8} align="start" pl={10} pt={10}>
      <HStack
        width={'full'}
        mb={4}
        bg={'white'}
        pr={5}
        display={'flex'}
        alignItems={'center'}
        justify={'space-between'}
      >
        <Text fontSize={'lg'} fontWeight={'bold'}>
          CNAPP Dashboard
        </Text>
        <Button onClick={() => setShowManageWidget(true)} px={5}>
          Manage Widgets
        </Button>
      </HStack>

      {data.categories.map(
        (category) =>
          !category.hidden && (
            <VStack key={category.name} align="start" w="full" bg={'white'}>
              <Text fontSize="lg" fontWeight="bold">
                {category.name}
              </Text>
              <HStack spacing={4} wrap="wrap" bg={'white'} justify="flex-start">
                {category.widgets.map(
                  (widget) =>
                    !widget.hidden && (
                      <Box
                        key={widget.id}
                        p={4}
                        borderWidth="5px"
                        borderRadius="lg"
                        width={{ base: '300px', md: '400px' }}
                        height={{ base: '150px', md: '200px' }}
                        bg={'white'}
                        display="flex"
                        flexDirection="column"
                        flexWrap={'wrap'}
                        position="relative"
                        mb={4}
                        mr={4}
                      >
                        <Text fontWeight="bold">{widget.name}</Text>
                        <Text mt={2} flex="1">
                          {widget.text}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="red"
                          position="absolute"
                          top={2}
                          right={2}
                          onClick={() => removeWidget(category.name, widget.id)}
                        >
                          x
                        </Button>
                      </Box>
                    )
                )}
                <Box
                  p={4}
                  borderWidth="5px"
                  borderRadius="lg"
                  width={{ base: '300px', md: '400px' }}
                  height={{ base: '150px', md: '200px' }}
                  bg={'white'}
                  display="flex"
                  flexDirection="column"
                  flexWrap={'wrap'}
                  position="relative"
                  alignItems={'center'}
                  justifyContent={'center'}
                  mb={4}
                  mr={4}
                >
                  <Button onClick={() => openAddWidgetModal(category.name)}>
                    +Add Widget
                  </Button>
                </Box>
              </HStack>
            </VStack>
          )
      )}

      {/* Drawer for Manage Widget */}
      <Drawer
        isOpen={showManageWidget}
        placement="right"
        onClose={() => setShowManageWidget(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Manage Widgets</DrawerHeader>
          <DrawerBody>
            <Text mb={10}>
              Personalise your dashboard by adding the following widget.
            </Text>
            <Tabs>
              <TabList>
                {data.categories.map((category) => (
                  <Tab key={category.name}>{category.name}</Tab>
                ))}
              </TabList>

              <TabPanels>
                {data.categories.map((category) => (
                  <TabPanel key={category.name}>
                    <VStack align="start" w="full">
                      <Checkbox
                        isChecked={!category.hidden}
                        onChange={() => toggleCategory(category.name)}
                      >
                        {category.name}
                      </Checkbox>
                      <VStack pl={4} align="start">
                        {category.widgets.map((widget) => (
                          <Checkbox
                            key={widget.id}
                            isChecked={!widget.hidden}
                            onChange={() =>
                              toggleWidget(category.name, widget.id)
                            }
                          >
                            {widget.name}
                          </Checkbox>
                        ))}
                      </VStack>
                    </VStack>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Modal for Adding Widget */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Widget to {selectedCategory}</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Widget Name"
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
            />
            <Input
              mt={4}
              placeholder="Widget Text"
              value={newWidgetText}
              onChange={(e) => setNewWidgetText(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addWidget}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default Content

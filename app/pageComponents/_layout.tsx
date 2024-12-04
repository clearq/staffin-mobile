import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const ComponentLayout = () => {
  return (
    <Stack>
      <Slot />
    </Stack>

  )
}

export default ComponentLayout
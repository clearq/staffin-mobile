import { View, Text } from 'react-native'
import React from 'react'
import JobAnnounce from '@/components/Pages/TabsComponents/JobAnnounce'
import { useTheme } from '@rneui/themed'

const page = () => {
  const { theme } = useTheme()
  
  return (
    <View
      style={{backgroundColor: theme.colors.background}} 
    >
      <JobAnnounce />
    </View>
  )
}

export default page
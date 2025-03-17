import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import LoginPage from '@/components/Pages/AuthPages/signin'
import { useTheme } from '@rneui/themed'
import api from '@/api/backend/config'
import pageStyle from '@/constants/Styles'
import SignUpPage from '@/components/Pages/AuthPages/signup'


const Page = () => {
  const { theme } = useTheme()
  

  return (
    <View
      style={{
        ...pageStyle.pageComponent, 
        backgroundColor: theme.colors.background
      }}
    >
      <SignUpPage />
    </View>
  )
}

export default Page
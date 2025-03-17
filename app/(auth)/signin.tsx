import { View, Text, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import SignInPage from '@/components/Pages/AuthPages/signin'
import { useTheme } from '@rneui/themed'
import api from '@/api/backend/config'
import pageStyle from '@/constants/Styles'


const Page = () => {
  const { theme } = useTheme()
  

  return (
    <View
      style={{
        ...pageStyle.pageComponent, 
        backgroundColor: theme.colors.background
      }}
    >
      <SignInPage />
    </View>
  )
}

export default Page
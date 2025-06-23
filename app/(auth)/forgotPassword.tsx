import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@rneui/themed'
import ForgotPassword from '@/components/Pages/AuthPages/ForgotPassword'
import pageStyle from '@/constants/Styles'

const forgotPassword = () => {
  const { theme } = useTheme()

  return (
    <View
      style={{
        ...pageStyle.pageComponent, 
        backgroundColor: theme.colors.background
      }}
    >
      <ForgotPassword />
    </View>
  )
}

export default forgotPassword

const styles = StyleSheet.create({})
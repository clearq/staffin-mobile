import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@rneui/themed'
import ResetPassword from '@/components/Pages/AuthPages/ResetPassword'
import pageStyle from '@/constants/Styles'

const resetPassword = () => {
  const { theme } = useTheme()

  return (
    <View
      style={{
        ...pageStyle.pageComponent, 
        backgroundColor: theme.colors.background
      }}
    >
      <ResetPassword />
    </View>
  )
}

export default resetPassword

const styles = StyleSheet.create({})
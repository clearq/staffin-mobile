import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { useTheme } from '@rneui/themed'
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();


  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex:1,
      }}
    >
      <Stack>
        <Stack.Screen name='signin' options={{headerShown:false}} />
        <Stack.Screen name='signup' options={{headerShown:false}} />
      </Stack>
    </View>
  )
}

export default Layout
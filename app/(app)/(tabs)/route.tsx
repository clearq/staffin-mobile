import { View, Text } from 'react-native'
import React from 'react'
import RecordsScreen from '@/components/Pages/TabsComponents/route/RecordsScreen'
import { useTheme } from '@rneui/themed';

const route = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <RecordsScreen />
    </View>
  )
}

export default route
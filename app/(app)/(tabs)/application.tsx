import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import MyApplications from '@/components/Pages/TabsComponents/MyApplications'

const page = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();

  return (
    <View style={{backgroundColor: theme.colors.background, flex:1}}> 
      <MyApplications />
    </View>
  )
}

export default page
import { View } from 'react-native'
import React from 'react'

import { useAuth } from '@/contexts/authContext';
import { Avatar, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { useToast } from 'react-native-toast-notifications';

import Preferences from '@/components/Pages/TabsComponents/Preferences';

const Page = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const { isLoading, authState:{ userData, userId } } = useAuth();

  


  return (
    <View
      style={{
        backgroundColor: theme.colors.background
      }}
    >
      {isLoading }
      <Preferences />
    </View>
  )
}

export default Page
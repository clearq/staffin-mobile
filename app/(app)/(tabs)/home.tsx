import { View, Text } from 'react-native'
import React from 'react'
import { useRouter, Link } from 'expo-router'

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext';

const Page = () => {
  const { isLoading, authState } = useAuth();
    const { theme } = useTheme()
    const { t } = useTranslation();
    const router = useRouter()

    const userRole = authState.userData?.roleId

  return (
    <View>
      {userRole === 1 && <Text>Admin Home</Text>}
      {userRole === 2 && <Text>Employre Home</Text>}
      {userRole === 3 && <Text>Staff Home</Text>}


    </View>
  )
}

export default Page

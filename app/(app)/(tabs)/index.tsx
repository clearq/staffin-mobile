import { View, Text, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter, Link } from 'expo-router'

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext';
import { hexToRgba } from '@/utils/rgba-to-hex';
import { theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import { Button } from '@/components/UI/Button';
import { useQuery } from '@tanstack/react-query';
import { getCompanyProfileUserId } from '@/api/backend';
import StaffHome from '@/components/Pages/Home/StaffHome';



const Page = () => {
  const { isLoading, authState:{ userData, userId } } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  

  const userRole = userData?.roleId



  return (
    <View style={{backgroundColor: theme.colors.background, flex:1}}>   
      {userRole === 1 && <Text>{`Admin Home ${userId}`}</Text>}
      {userRole === 2 && <Text>{`Employre Home ${userId}`}</Text>}
      {userRole === 3 && 
      <View>
        <StaffHome />
      </View>
      }

    </View>
  )
}

export default Page



import { View, Text, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter, Link } from 'expo-router'

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext';
import { hexToRgba } from '@/utils/rgba-to-hex';
import { theme } from '@/constants/Theme';
import pageStyle from '@/constants/Styles';
import Button from '@/components/UI/Button';
import { MessageModal } from '../../../components/Modal/MessageModal';



const Page = () => {
  const { isLoading, authState:{ userData } } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();
  
  const [userInfoMessage, setUserInfoMessage] = useState(false)

  const userRole = userData?.roleId

  useEffect(() => {
    if(userData?.firstName === "" && userData.lastName === "") {
      setUserInfoMessage(true)
    }
  },[])

  return (
    <View>
      {userInfoMessage && 
        <MessageModal  
          visible={userInfoMessage} 
          onClose={() => setUserInfoMessage(false)}
        />
      }
      
      {userRole === 1 && <Text>Admin Home</Text>}
      {userRole === 2 && <Text>Employre Home</Text>}
      {userRole === 3 && <Text>Staff Home</Text>}

    </View>
  )
}

export default Page



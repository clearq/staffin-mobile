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
import { getItem, setItem } from '@/utils/asyncStorage';
import { checkOnBoardingStatus } from '@/api/backend/user';
import Onboarding from '@/components/Pages/Home/Onboarding';
import { IUser } from '@/types';



const Page = () => {
  const { isLoading, authState:{ userData, userId, token} } = useAuth();
  const { theme } = useTheme()
  const { t } = useTranslation();

  const { data: onBoarding } = useQuery({
    queryKey: ['check-onboarding', userId],
    queryFn: async () => {
      const response = await checkOnBoardingStatus(Number(userId))
      return response
    },
    enabled: !! userId,
  })

  useEffect(() => {
    if (onBoarding) {
      //console.log('Onboarding complete?', onBoarding.isCompleted);
      setOpenIntroduction(!onBoarding.isCompleted)
    }
  },[token])

  const [openIntroduction, setOpenIntroduction] = useState(false)
    
  const userRole = userData?.roleId

  return (
    <View style={{backgroundColor: theme.colors.background, flex:1}}>   
      {userRole === 1 && <Text>{`Admin Home ${userId}`}</Text>}
      {userRole === 2 && <Text>{`Employre Home ${userId}`}</Text>}
      {userRole === 3 && 
        <View>
          {openIntroduction && 
            <UserOnboarding 
              user={userData!}
              userRefetch={() => {}}
              onClose={() => setOpenIntroduction(!openIntroduction)}
              visible={openIntroduction}
            />
          }
          {!openIntroduction && 
            <StaffHome 
              currentUser={userData!}
              currentUserId={Number(userId)}
              isLoading= {isLoading}
              token={token!}
            />
          }
        </View>
      }

    </View>
  )
}

export default Page


interface props {
  user: IUser;
  userRefetch: () => void
  onClose: () => void
  visible: boolean
}

const UserOnboarding = ({user, userRefetch, onClose, visible}: props) => {
  
  const { theme } = useTheme()
  const { t } = useTranslation();

  

  return(
    <View style={{backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black}}>
    
      <Onboarding
        user={user}
        refetch= {userRefetch}
        visible={visible}
        onClose={onClose}
      />  

    </View>

  )
}
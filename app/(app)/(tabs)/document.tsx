import { View, Text, ActivityIndicator, Image, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { downloadCv, generateCv, getCv } from '@/api/backend'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import { Button } from '@/components/UI/Button'
import pageStyle from '@/constants/Styles'
import { useRouter } from 'expo-router'
import Document from '@/components/Pages/TabsComponents/Profile/StaffProfile/Document'
import { useAuth } from '@/contexts/authContext'
import { IUser } from '@/types'

const page = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useTheme()
  const router = useRouter()
  const {authState:{userData, userId}, isLoading} = useAuth();
  const [user, setUser] = useState<IUser>()
  

  const handleCreateCv = async () => {
    
    try {
      
     
      const response = await generateCv();
      
      if (response?.url) {
        // Open the URL in browser to download the CV
        // Linking.openURL(response.url);      
        toast.show(`${t("success-generate-cv-message")}`, {
          type: "success"
        });

        
      } else {
        throw new Error(`${t("no-url-message")}`);
        
      }
    

    } catch (error) {
      toast.show(`${"failed-generate-cv-message"}`, {
        type: "error"
      });
    }
    
  }
  
  

  return (
    <View
      style={{
        ...pageStyle.pageComponent,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      
      


      <Document />
  
    </View>
  )
}

export default page
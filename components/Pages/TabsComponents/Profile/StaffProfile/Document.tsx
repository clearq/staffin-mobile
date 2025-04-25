import { View, Text, ActivityIndicator, Image, TouchableOpacity, StyleSheet  } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { downloadCv, getCv } from '@/api/backend'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import Button from '@/components/UI/Button'
import pageStyle from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'


interface ICv {
  name: string
  url: string
}

interface props {
  data: ICv
}

const Document = ({data}: props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useTheme()
  const router = useRouter()


  const handleDownloadCv = async () => {
    try {
      downloadCv() 

      toast.show(`${t("success-download-message")}`, {
        type: "success"
      });
    } catch (error) {
      toast.show(`${t("failed-download-message")}`, {
        type: "error"
      })
    }
  }

  return (
    <View
      style={{
        ...styles.container
      }}
    >
      <View>
        {/* <Image 
          source={require('@/assets/image/CV-Download.png')}
          width={100}
        /> */}
      </View>

      <View
        style={{
          ...styles.buttonGroup
        }}
      >
        <Text
          style={{
            ...pageStyle.button16,
            color: theme.colors.grey0,
          }}
        >
          {data.name}
        </Text>

        <View style={{width: '40%'}}>
          <Button 
            title={`${t("download")}`}
            size='sm'
            onPress={handleDownloadCv}
            icon={(
              <MaterialCommunityIcons name='download' size={20} color={theme.colors.white} />
            )}    
            iconPosition='right'      
          />
        </View>


      </View>

    </View>


  )
}

export default Document

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing?.xl,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
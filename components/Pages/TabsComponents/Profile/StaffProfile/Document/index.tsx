import { View, Text, ActivityIndicator, Image, TouchableOpacity, StyleSheet  } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { downloadCv, getCv } from '@/api/backend'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { Sizes, theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import { Button } from '@/components/UI/Button'
import pageStyle from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CreateCV from './createCV'


interface ICv {
  name: string
  url: string
}

interface props {
}

const Document = ({}: props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useTheme()
  const router = useRouter()

  const {data, isLoading: isCvLoading} = useQuery({
    queryKey: ["cv-data"],
    queryFn: async () => {
      const response = getCv();

      return response
    }
  })

  if (isCvLoading) return (
    <View
      style={{
        ...pageStyle.pageComponent,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  )

  if (!data) return (
    <View
      style={{
        ...pageStyle.pageComponent,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.md,
      }}
    >
      <Text style={{...pageStyle.button20, color: theme.colors.primary}}>{`${t("no-document-message")}`}</Text>
      <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>{`${t("create-cv-message")}`}</Text>

      <View
        style={{
          flexDirection:'column',
          gap: theme.spacing.sm
        }}
      >
        <Text
          style={{
            ...pageStyle.paraText,
            color: theme.colors.grey0,
          }}
        >
          {`${t("link-to-profile-message")}`}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/profile')}
        >
          <Text 
            style={{
              ...pageStyle.button16, 
              color: theme.colors.primary,
              textDecorationLine: "underline",
              textDecorationColor: theme.colors.primary,
            }}
          >
            {`${t("create-profile")}`}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );


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
    <View style={{flex: 1,}}>

      <View 
        style={{
          paddingTop: Sizes.fixPadding,
        }}
      >
        <CreateCV />
      </View>

      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 'auto'
      }}>
      
        {isCvLoading && <ActivityIndicator color={theme.colors.primary}/>}
        <View
          style={{
            ...styles.container
          }}
        >
          <View>
            <Image 
              source={require('@/assets/image/CV-Download.png')}
              height={80}
              style={{resizeMode: 'contain'}}
            />
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
                size={'md'}
                onPress={handleDownloadCv}
                iconRight={'download'}   
                color={'secondary'}    
                titleColor={theme.colors.white}
              />
            </View>


          </View>

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
    gap: theme.spacing?.md,
  }
})
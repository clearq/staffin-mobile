import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { downloadCv, getCv } from '@/api/backend'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import Button from '@/components/UI/Button'
import pageStyle from '@/constants/Styles'

const page = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useTheme()

  const {data, error, isLoading} = useQuery({
    queryKey: ["cv-data"],
    queryFn: getCv
  })

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading CV</Text>;
  if (!data) return <Text>You don't have any document file.</Text>;

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
        ...pageStyle.pageComponent
      }}
    >
      {isLoading && <ActivityIndicator color={theme.colors.primary}/>}

      <View
        style={{flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}
      >
        <Text>{data.name}</Text> 
        <Button  
          title="Download" 
          onPress={handleDownloadCv} 
          size='sm'
        />
      </View>
    </View>
  )
}

export default page
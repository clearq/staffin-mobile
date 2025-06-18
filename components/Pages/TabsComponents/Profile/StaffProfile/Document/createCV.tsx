import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { downloadCv, generateCv, getCv } from '@/api/backend'
import { Button } from '@/components/UI/Button'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import { useRouter } from 'expo-router'

const CreateCV = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useTheme()
  const router = useRouter()
  const [isDisable, setIsDisable] = useState(false)

  const handleCreateCv = () => {}


  return (
    <View>
      <Button 
        title={`${t("create-cv")}`}
        onPress={handleCreateCv}
        size={'lg'}
        color={'primary'}
        titleColor={theme.colors.white}
        disabled={isDisable}
      />
    </View>
  )
}

export default CreateCV

const styles = StyleSheet.create({})
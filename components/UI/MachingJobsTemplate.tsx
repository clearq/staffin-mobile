import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import pageStyle from '@/constants/Styles'

const MachingJobsTemplate = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  

  return (
    <View
      style={{
        ...styles.cardContainer,
        backgroundColor: theme.colors.background,
      }}
    >

      <View
        style={{...styles.textGroup}}
      >
        <Text 
          style={{
            ...pageStyle.headline03, 
            color: theme.colors.grey0
          }}>
            Position/Title
        </Text>

        <Text
          style={{
            ...pageStyle.xsText, 
            color: theme.colors.grey0
          }}
        >
          Company Name
        </Text>
        
        <Text
          style={{
            ...pageStyle.xsText, 
            color: theme.colors.grey0
          }}
        >
          Area
        </Text>
        
        <Text
          style={{
            ...pageStyle.xsText, 
            color: theme.colors.grey0
          }}
        >
          Created at
        </Text>
      </View>
      
    </View>
  )
}

export default MachingJobsTemplate

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: theme.spacing?.md,
    flexDirection: 'column',
  },
  textGroup : {
    flexDirection: 'column'
  }
})
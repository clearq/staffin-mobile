import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Button, useTheme } from '@rneui/themed'
import pageStyle from '@/constants/Styles'
import page from '@/app/(app)/(tabs)/application'
import { theme } from '@/constants/Theme'

interface props {
  onPress: () => void
  message: string
}

const EmptyItemMessage = ({onPress, message}: props) => {
  const { theme } = useTheme()
    const { t } = useTranslation();
    
  return (
    <View
      //onPress={onPress}
      style={{width: '100%', alignItems: 'center'}}
    >
        
      <View style={{ flexDirection: 'column', gap: theme.spacing.xs, alignItems: 'center'}}>
        <Text style={{...pageStyle.headline02, color: theme.colors.grey0}}>{t("no-activity-message")}</Text>
        
        <TouchableOpacity 
          style={{
            ...styles.button,
            borderColor: theme.colors.primary
          }}
          onPress={onPress}
        >
          <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>{message}</Text>
          <MaterialCommunityIcons name='playlist-plus' size={20} color={theme.colors.grey0} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EmptyItemMessage

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 100,
    width: '100%',
    paddingHorizontal: theme.spacing?.md, 
    paddingVertical: theme.spacing?.sm,
    flexDirection: 'row', 
    gap: theme.spacing?.md, 
    alignItems: 'flex-start', 
    marginTop: theme.spacing?.sm
  }
})
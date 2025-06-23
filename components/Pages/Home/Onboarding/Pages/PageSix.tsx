import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Sizes, theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import pageStyle from '@/constants/Styles';
import { useQuery } from '@tanstack/react-query';
import TalkBubble from '../TalkBubble';

const PageFive = ({onClose}: {onClose: () => void}) => {
  const { theme } = useTheme()
  const { t } = useTranslation();


  return (
    <View
      style={{
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 50,
        marginVertical: 'auto',
      }}
    >
      <TalkBubble 
        children={
          <View style={{...styles.col, padding: theme.spacing.md}}>

            <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
              {t("intro-last-message")}
            </Text>
      
            <TouchableOpacity
              onPress={onClose}
              style={{
                ...styles.button,
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text
                style={{
                  color: theme.colors.white,
                  ...pageStyle.button16,
                }}
              >
                {t("get-started")}
              </Text>
            </TouchableOpacity> 

          </View>
        }
      />

        <Image 
          source={require('@/assets/image/onboarding/Jack6.png')} 
          style={{...styles.imageStyle}}
        />
    </View>
  )
}

export default PageFive

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.xl,
  },
  button:{
    paddingHorizontal: theme.spacing?.xl,
    paddingVertical: theme.spacing?.md,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    height: 300,
    resizeMode: 'center'
  }
})
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Sizes, theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import pageStyle from '@/constants/Styles';
import TalkBubble from '../TalkBubble';

const PageOne = () => {
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
              {t("intro-hello-message")}
            </Text>
            <Text style={{...pageStyle.headline01, color: theme.colors.grey0}}>
              {t("intro-step-one-message")}
            </Text>

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

export default PageOne

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  col: {
    flexDirection: 'column',
    gap: theme.spacing?.xl,
  },
  imageStyle: {
    height: 300,
    resizeMode: 'center'
  }
})
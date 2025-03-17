import React, { useRef } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter, Link } from 'expo-router'

import { useTranslation } from "react-i18next";
import { useTheme } from '@rneui/themed'
import { useAuth } from '@/contexts/authContext';

import { getUserById } from '@/api/backend'
import { Text } from '@rneui/themed'
import { Fonts, Sizes, theme } from '@/constants/Theme'

import { TextField } from '@/components/UI/Input/TextField'
import { Formik } from "formik";
import * as Yup from "yup";
import Button from '@/components/UI/Button'
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import pageStyle from '@/constants/Styles';


interface props {
  children: React.ReactNode;
  title: string
}

const PageTemplate = ({ children, title }:props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();


  return (
    <View style={{ flex: 1,}}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInUp.delay(200).duration(1000).springify()}
          style={{ 
            alignItems: "center", 
            margin: Sizes.fixPadding * 2, 
          }}
        >

          <Text 
          style={{
            ...pageStyle.headline02,
            color: theme.colors.grey0,
            marginTop: Sizes.fixPadding * 2
          }}
          >
            {title}
          </Text>

        </Animated.View> 

        {children} 

      </ScrollView>
    </View>
  )
}

export default PageTemplate

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Coolvetica",
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
});
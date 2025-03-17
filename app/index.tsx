import { View, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Switch, useTheme, useThemeMode, Text, Image } from '@rneui/themed'

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";
import Button from '@/components/UI/Button';
import { colors, commonStyles, Fonts, screenHeight, Sizes, theme } from '@/constants/Theme';
import {MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import pageStyle from '@/constants/Styles';
import { color } from '@rneui/themed/dist/config';

const App = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter();
  const [ loading, setLoading ] = useState(false)

    
  
    // console.log('theme:', theme.mode);
    const handleOnPress = () => {
      setLoading(true)
      router.push("/(auth)/signin") 

      setLoading(false)
    }
    

  return (
    <View 
      style={{
        backgroundColor: theme.colors.background,
        flex:1,
      }}
    >
      <SafeAreaView 
        style={{
          height: '100%',
          alignContent: 'center', 
          alignItems: 'center', 
          justifyContent:'center',
          gap:theme.spacing.xl,
          padding: Sizes.fixPadding,
        }}
      >

        {/* insert image or animation later */}
        <View />  
        <Image 
          source={require('@/assets/images/icon.png')}
          style={{
            width: 100,
            height: 100,
          }}
        />

        <View
          style={{
            alignItems:'center',
            gap: theme.spacing.md,
          }}
        >
          <Text 
            style={{
              ...pageStyle.headline01, 
              color: theme.colors.grey0,
            }}
          >
            {`${t("start-message")}`}
          </Text>

          <Text 
            style={{
              ...pageStyle.smText,
              color: theme.colors.grey0,
            }}
          >
            {`${t("start-sub-text")}`}
          </Text>
        </View>

        <Button
          containerStyle={{width:'100%'}}
          buttonStyle={[commonStyles.buttonStyle, styles.buttonStyle]}
          title={`${t("start-button-text")}`}
          titleStyle={{...pageStyle.button20, color: theme.colors.white}}
          iconPosition='right'
          icon={
            <MaterialCommunityIcons 
              name='arrow-right' 
              color={theme.colors.white} 
              size={24}
              style={{paddingLeft:24}}
            />
          }
          size='lg'
          loading={loading}
          onPress={handleOnPress}
        />

      </SafeAreaView>
    </View>
  )
}

export default App


const styles = StyleSheet.create({
  buttonStyle:{
    width:'100%',
    alignSelf: "center",
    justifyContent:'center'
  },
})
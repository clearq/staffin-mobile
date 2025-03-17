import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { useTranslation } from "react-i18next";
import { useAuth } from '@/contexts/authContext';
import { setItem } from "@/utils/asyncStorage";
import Button from '@/components/UI/Button'

import { Fonts, Sizes, theme } from "@/constants/Theme";
import { Avatar, Overlay, Switch, useTheme, useThemeMode } from "@rneui/themed";
import pageStyle from '@/constants/Styles'


const setting = () => {
  const [showLogoutDialog, setshowLogoutDialog] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  
  const {
    authState: { userData },
    SignOut,
  } = useAuth();
  const { t } = useTranslation();
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  const handleSwitchTheme = async (value: boolean) => {
    // Call setMode to update the theme mode
    // console.log('value:', value); 
    
    setMode(value ? "dark" : "light");

    // Save the select theme mode in localStrage
    await setItem("theme", value ? "dark" : "light");
  }

  return (
    <View
      style={{
        ...pageStyle.pageComponent, 
        backgroundColor: theme.colors.background
      }}
    >

      <View
        style={{
          ...styles.container
        }}
      >
        {/* Theme */}
        <View
          style={{
            ...styles.itemWrapper
          }} 
        >
          <Text
            style={{
              ...pageStyle.smText,
              color: theme.colors.grey0
            }}
          >
            Theme: 
          </Text>
          <TouchableOpacity>
            <Switch
              value={mode === "dark"}
              onValueChange={handleSwitchTheme}
            />
          </TouchableOpacity>
        </View>

        {/* Theme */}
        <View
          style={{...styles.itemWrapper}} 
        >
          <Text
            style={{
              ...pageStyle.smText,
              color: theme.colors.grey0
            }}
          >
            {`${t("log-out")}:`}
          </Text>
          <Button
            title={`${t("log-out")}`}
            onPress={SignOut}
            size='md'
            color='primary'
            titleStyle={{ ...pageStyle.button16 }}
            radius={"sm"}
            containerStyle={{
              ...styles.buttonContainer,
              borderColor: theme.colors.primary,                     
              borderWidth: 2,
              borderRadius:10
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default setting

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    gap: Sizes.fixPadding,
  },
  itemWrapper: {
    flexDirection:'row', 
    gap: theme.spacing?.lg,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  buttonContainer: {
    flexShrink: 1,
    height: "100%",
    paddingHorizontal: 0,
  },
});

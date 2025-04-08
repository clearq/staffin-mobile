import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'

import { IAuthInfo, IAuthState, useAuth } from "@/contexts/authContext";
import { Fonts, Sizes, theme } from '@/constants/Theme'
import { Avatar, ListItem, useTheme } from '@rneui/themed'
import { useTranslation } from "react-i18next";

import CustomTabBar from '@/components/Pages/TabsComponents/CustomTabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyStatusBar from '@/components/StatusBar';
import { ActivityIndicator } from 'react-native';
import { SkeletonImage } from '@/components/Skeleton/skeleton-image';


const PageHeader = (data: any, isLoading: boolean) => {
  const { theme } = useTheme();
  
  const userData = data.data
  
  return (
    <View
      style={{
        width: "auto",
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: Sizes.fixPadding * 1.5,
        paddingVertical: Sizes.fixPadding,
      }}
    >
      <MyStatusBar />
      {isLoading && (
        <ActivityIndicator color={theme.colors.primary} />
      )}
      {data &&
        <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
          }}
        >
          <Text>Search</Text>

          <View
            style={{
              flexDirection:'row',
              alignItems:'center',
              gap: theme.spacing.lg,
            }}
          >

            <TouchableOpacity>
              <MaterialCommunityIcons name='bell-badge-outline' size={30} color={theme.colors.grey3}/>
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons name='chat-outline' size={30} color={theme.colors.grey3}/>
            </TouchableOpacity>

          </View>
        </View>
        }

    </View>
  )
}

export default PageHeader
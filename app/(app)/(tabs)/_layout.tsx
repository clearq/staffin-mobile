import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import PageHeader from '@/components/TabsHeader';
import { hexToRgba } from '@/utils/rgba-to-hex';


export const unstable_settings = {
  initialRouteName: "index",
};

export function TabBarIcon(props: { 
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"]; 
  color: string; 
  size: number; 
  isActive: boolean; style?: any
 }) {
  return <MaterialCommunityIcons name={props.name} color={props.color} size={props.size} style={{ ...props.style }} isActive={props.isActive} 
  />;
}

const _layout = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    authState: { userData, userId },
    session,
    isLoading,
  } = useAuth();

  if (isLoading && !userData) {
    return <ActivityIndicator color={theme.colors.primary} />
    //return <SplashScreenLogo />;
  }

  if (!session) {
    return <Redirect href="/(auth)/signin" />;
  } 

  const homeTab = () => {
    if (userData?.roleId === 3 ) {
      return {title: "Home", label: "home"}
    }
    if (userData?.roleId === 1 ) {
      return {title: "Dashboard", label: "dashboard"}
    } 
    if (userData?.roleId === 2) {
      return {title: "Dashboard", label: "dashboard"}
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'transparate' }}>

      <Tabs
        initialRouteName={unstable_settings.initialRouteName}
        tabBar={(props) =>(
          <View 
            style={{ 
              paddingHorizontal: Sizes.fixPadding, 
              backgroundColor: 'transparate',
            }}
          >
            <CustomTabBar {...props} />
          </View>
        )}
        
        screenOptions={() => ({
          headerShown: true,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
           
          },
          tabBarItemStyle: {
            width: 'auto',
            backgroundColor: 'transparent',
            borderColor: "transparent",
            borderWidth: 0,
            shadowColor: "transparent",
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.grey2,
        })}
      >
        {/* Home Tab */}
        <Tabs.Screen 
          name="index"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: `${homeTab()?.title}`,
            tabBarLabel: t(`${homeTab()?.label}`),
            tabBarIcon: ({ focused }) => (
              <>
                {userData?.roleId === 3 && 
                  <TabBarIcon
                    name={focused ? "home" : "home-outline"}
                    isActive={focused}
                    size={32}
                    color={focused ? theme.colors.primary : theme.colors.white}
                  />
                }
                {userData?.roleId === 1 && 
                  <TabBarIcon
                    name={focused ? "view-dashboard" : "view-dashboard-outline"}
                    isActive={focused}
                    size={32}
                    color={focused ? theme.colors.primary : theme.colors.white}
                  />
                }
                {userData?.roleId === 2 && 
                  <TabBarIcon
                    name={focused ? "view-dashboard" : "view-dashboard-outline"}
                    isActive={focused}
                    size={32}
                    color={focused ? theme.colors.primary : theme.colors.white}
                  />
                }
              </>
            ), 
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }} 
        />

        {/* Jobs Tab */}
        <Tabs.Screen 
          name="jobs"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Jobs",
            tabBarLabel: t("jobs"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "briefcase" : "briefcase-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.primary : theme.colors.white}
              />
            ),
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }} 
        />

        {/* Route Tab (no label or icon in the tab) */}
        <Tabs.Screen
          name="route"
          options={{
            tabBarShowLabel: false,
            headerTitleAlign: "center",
            headerShown: false,
            headerTitle: t("profile"),
            tabBarLabel: "Route",
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }}
        />

        {/* Profile Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="profile"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: t("overview"),
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }} 
        />

        {/* Application Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="application"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: "My Application",
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }} 
        />

        {/* Document Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="document"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: "My Document",
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }} 
        />

        {/* Community Tab */}
        <Tabs.Screen 
          name="community"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Community",
            tabBarLabel: t("community"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "account-group" : "account-group-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.primary : theme.colors.white}
              />
            ),
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }} 
        />

        {/* Setting Tab */}
        <Tabs.Screen 
          name="setting"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Setting",
            tabBarLabel: t("setting"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "cog" : "cog-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.primary : theme.colors.white}
              />
            ),
            headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader data={userData} isLoading={isLoading} />,
          }} 
        />
      </Tabs>
    </View>
  )
}

export default _layout




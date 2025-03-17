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


export const unstable_settings = {
  initialRouteName: "home",
};

export function TabBarIcon(props: { 
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"]; 
  color: string; size: number; 
  isActive: boolean; style?: any 
}) {
  return <MaterialCommunityIcons name={props.name} color={props.color} size={props.size} style={{ ...props.style }} isActive={props.isActive} 
  />;
}

const _layout = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const {
    authState: { userData },
    session,
    isLoading,
  } = useAuth();

  if (isLoading && !userData) {
    return <ActivityIndicator color={theme.colors.primary} />
    //return <SplashScreenLogo />;
  }

  if (!session) {
    return <Redirect href="/signin" />;
  }

  return (
    <View
      style={{
        flex: 1, 
        backgroundColor: theme.colors.cardBg
      }}
    >
      <Tabs
        initialRouteName={unstable_settings.initialRouteName}
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={() => ({
          headerShown: true,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderColor: theme.colors.divider,
          },
          tabBarItemStyle: {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.divider,
            borderWidth: 1,
            shadowColor: theme.colors.background,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.primary,
        })}
      >

        <Tabs.Screen 
          name="home"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Home",
            headerTitleStyle: {
              color: theme.colors.grey0,
            },
            headerStyle: {
              backgroundColor: theme.colors.cardBg,
            },
            header: () => (
              <PageHeader data={userData} isLoading={isLoading}/>
            ),
            tabBarLabel: t("tab-bar-overview"),
            tabBarIcon: ({ focused }) => (
              userData?.roleId === 3 
              ? <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  isActive={focused}
                  size={32}
                  color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
                />
              : <TabBarIcon
                  name={focused ? "view-dashboard" : "view-dashboard-outline"}
                  isActive={focused}
                  size={30}
                  color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
                />
            ),
          }} 
        />
        
        <Tabs.Screen 
          name='jobs'
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Jobs",
            headerTitleStyle: {
              color: theme.colors.grey0,
            },
            headerStyle: {
              backgroundColor: theme.colors.searchBg,
            },
            header: () => (
              <PageHeader data={userData} isLoading={isLoading}/>
            ),
            tabBarLabel: t("tab-bar-overview"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "briefcase" : "briefcase-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
              />
            ),
          }} 
        />

        <Tabs.Screen 
          name='profile'
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Profile",
            headerTitleStyle: {
              color: theme.colors.grey0,
            },
            headerStyle: {
              backgroundColor: theme.colors.searchBg,
            },
            header: () => (
              <PageHeader data={userData} isLoading={isLoading}/>
            ),
            tabBarLabel: "Route",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "account" : "account-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
              />
            ),
          }} 
        />

        <Tabs.Screen 
          name='community'
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Community",
            headerTitleStyle: {
              color: theme.colors.grey0,
            },
            headerStyle: {
              backgroundColor: theme.colors.searchBg,
            },
            header: () => (
              <PageHeader data={userData} isLoading={isLoading}/>
            ),
            tabBarLabel: t("tab-bar-overview"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "account-group" : "account-group-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
              />
            ),
          }} 
        />
        <Tabs.Screen 
          name='setting'
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Setting",
            headerTitleStyle: {
              color: theme.colors.grey0,
            },
            headerStyle: {
              backgroundColor: theme.colors.searchBg,
            },
            header: () => (
              <PageHeader data={userData} isLoading={isLoading}/>
            ),
            tabBarLabel: t("tab-bar-overview"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "cog" : "cog-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
              />
            ),
          }} 
        />
      </Tabs>
    </View>
  )
}

export default _layout


const PageHeader = (data: any, isLoading: boolean) => {
  const { theme } = useTheme();
  
  const userData = data.data
  
  return (
    <View
      style={{
        width: "auto",
        backgroundColor: theme.colors.cardBg,
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
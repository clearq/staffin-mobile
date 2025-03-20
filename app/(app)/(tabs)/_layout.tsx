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
    <View style={{ flex: 1, backgroundColor: theme.colors.searchBg }}>
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
        {/* Home Tab */}
        <Tabs.Screen 
          name="home"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Home",
            tabBarLabel: t("home"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                isActive={focused}
                size={32}
                color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
              />
            ),
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
                color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
              />
            ),
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

          }}
        />

        {/* Profile Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="profile"
          options={{
            href: null, // Hides from the tab bar
            headerShown: true,
            headerTitle: t("overview"),
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
            headerShown: true,
            headerTitle: "My Application",
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
            headerShown: true,
            headerTitle: "My Document",
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
                color={focused ? theme.colors.primary : theme.mode === "light" ? theme.colors.grey3 : theme.colors.white}
              />
            ),
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
        backgroundColor: theme.colors.searchBg,
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
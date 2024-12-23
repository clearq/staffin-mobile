import { View, Image, Button, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react';
import { router, Tabs, useRouter } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '@/constants/Colors';
import React from 'react';


const AdminTabsLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{ 
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.tintColor,
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.tintColor,
            height: 84,
          },
          headerShown:false
        }} 
      >
          <Tabs.Screen 
            name="dashboard"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="view-dashboard-outline" color={color} />,
              headerShown: false
            }}
          />
          <Tabs.Screen 
            name="chat"
            options={{
              title: "Chat",
              tabBarIcon: ({ color }) => 
              <MaterialCommunityIcons size={28} name="chat-outline" color={color} />,
              headerShown: false,
            }}
          />
          <Tabs.Screen 
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name='account-circle-outline' color={color} />,
              headerShown: false,    
            }}
            
          />
          <Tabs.Screen 
            name="jobs"
            options={{
              title: "Jobs",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="briefcase-outline" color={color} />,
              headerShown: false
            }}
          />
          <Tabs.Screen 
            name="network"
            options={{
              title: "Network",
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account-group-outline" color={color} />,
              headerShown: false
            }}
          />
        </Tabs>
        
      </>
  )
}

export default AdminTabsLayout



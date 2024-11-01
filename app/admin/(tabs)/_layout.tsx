import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function TabLayout() {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  // if userData.role !== 1  isAdmin=false
  // if userData.role === 1  isAdmin=true
  
  return (
    <Tabs
      screenOptions={{ 
        tabBarActiveTintColor: "#ED8F59",
        tabBarInactiveTintColor: "#B4BEC0",
        tabBarStyle: {
          backgroundColor: "#FCFCFC",
          borderTopWidth: 1,
          borderTopColor: "#B4BEC0",
          height: 84,
        },
        headerStyle:{
          backgroundColor:`${Colors.dark}`,
          height: 120
        }, headerTintColor: `${Colors.white}`,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} 
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />,
          headerShown: true
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="chat-processing-outline" color={color} />,
          headerShown: true
        }}
      />   
      <Tabs.Screen
        name="profile"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="office-building-outline" color={color} />,
          headerShown: true
        }}
      />   
      
      <Tabs.Screen
        name="dashboard"
        options={{
          title:'Dashboard',
          tabBarIcon: (
            { color }) => <MaterialCommunityIcons size={28} name="view-dashboard-outline" color={color} />,
          headerShown: true
        }}
      />   
      <Tabs.Screen
        name="network"
        options={{
          title: 'Network',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account-group-outline" color={color} />,
          headerShown: true
        }}
      />  
    </Tabs>  
  );
}


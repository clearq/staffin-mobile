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
        }
      }} 
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="chat-processing-outline" color={color} />,
          headerShown: false
        }}
      />   
      <Tabs.Screen
        name="profile"
        options={{
          title: (isAdmin ? 'About' : 'My Profile'),
          tabBarIcon: (
            { color }) => (
            isAdmin ? <MaterialCommunityIcons size={28} name="office-building-outline" color={color} /> 
            : <MaterialCommunityIcons size={28} name="account-circle-outline" color={color} /> 
          ),
          headerShown: false
        }}
      />   
      
      <Tabs.Screen
        name="tab2"
        options={{
          title: (isAdmin ? 'Dashboard' : 'Jobs'),
          tabBarIcon: (
            { color }) => (
            isAdmin ? <MaterialCommunityIcons size={28} name="view-dashboard-outline" color={color} /> 
            : <MaterialCommunityIcons size={28} name="briefcase-outline" color={color} /> 
          ),
          headerShown: false
        }}
      />   
      <Tabs.Screen
        name="network"
        options={{
          title: 'Network',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account-group-outline" color={color} />,
          headerShown: false
        }}
      />  
    </Tabs>  
  );
}


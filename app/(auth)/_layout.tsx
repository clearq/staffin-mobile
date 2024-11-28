import { Stack } from 'expo-router/stack';
import React from 'react'
import SignIn from './sign-in';
import Colors from '@/constants/Colors';


const AuthLayout = () => {
  return (
  
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: `${Colors.primaryDark}`,
        },
        headerTintColor: `${Colors.textWhite}`,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
          title:'Sign In'
        }}
      />
      <Stack.Screen
        name="sign-up/index"
        options={{
          headerShown: false,
          title:'Sign Up'
        }}
      />
      <Stack.Screen
        name="sign-up/staff"
        options={{
          headerShown: true,
          title: 'Sign Up/Staff'
        }}
      />
      <Stack.Screen
        name="sign-up/admin"
        options={{
          headerShown: true,
          title: 'Sign Up/Admin'
        }}
      />
    </Stack>
    
  )
}

export default AuthLayout
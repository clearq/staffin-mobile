// Start page
import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import { StatusBar } from 'expo-status-bar'
import { useRouter, Link } from 'expo-router';

import logo from '@/assets/images/main-logo.png'
import Start from './(app)';


const App = () => {
  const router = useRouter();

  return (
   
    <SafeAreaView className='bg-black h-full'> 
      <ScrollView contentContainerStyle={{
          height: "100%",
        }}
      >
       <Start />
      </ScrollView>  
    </SafeAreaView>
  )
}

export default App

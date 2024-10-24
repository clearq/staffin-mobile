// Start page
import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import { StatusBar } from 'expo-status-bar'
import { useRouter, Link } from 'expo-router';
import CustomButton from "@/components/CustomButton";

import logo from '@/assets/images/main-logo.png'

const App = () => {
  const router = useRouter();
  
  return (
   
    <SafeAreaView className='bg-black h-full'> 
      <ScrollView contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className='w-full h-full justify-center items-center px-4'>
          <Image 
            source={logo} 
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain" 
          />
          
          <View className='mt-4 w-full'>
          
            <CustomButton
              onPress={() => router.push("/(auth)/sign-in")}
              title="Log In"
              containerStyles='bg-primary mb-4'
              textStyles='text-white'
            />

            <CustomButton
              onPress={() => router.push("/(auth)/sign-up")}
              title="Sign Up"
              containerStyles='border-2 border-bgWhite'
              textStyles='text-bgWhite'
            />           

          </View>
          <Text></Text>
        </View>
      </ScrollView>  
    </SafeAreaView>
  )
}

export default App

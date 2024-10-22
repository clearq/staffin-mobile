import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router';
import CustomButton from "@/components/CustomButton";

const App = () => {
  const router = useRouter();
  
  return (
    <View className='flex-1'>   
    
      <SafeAreaView className='flex-1 mx-5 my-12 justify-between'>
        <View>
         <Text>Start</Text>
         <CustomButton onPress={() => router.push("/home")} title="Get Started" />

        </View>

        <StatusBar style='light' />
      </SafeAreaView>
        
    </View>
  )
}

export default App

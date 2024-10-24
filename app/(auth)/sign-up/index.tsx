import { View, Text, Image, ScrollView } from 'react-native'
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { globalStyles } from '@/constants/GlobalStyle';
import CustomButton from '@/components/CustomButton';

export default function SignUp() {
  const router = useRouter();
  
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>       

          <Text className="text-2xl font-semibold text-d mt-10 font-psemibold">
            Sign up to Staffin as...
          </Text>

          <View className='flex-row justify-between mt-8'>

            <CustomButton 
              onPress={() => router.push("/(auth)/sign-up/staff")}
              title="Staff"
              containerStyles='bg-primary w-40'
              textStyles='text-white'
            />
            <CustomButton 
              onPress={() => router.push("/(auth)/sign-up/admin")}
              title="Admin"
              containerStyles='bg-primary w-40'
              textStyles='text-white'
            />        
          </View>

                 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
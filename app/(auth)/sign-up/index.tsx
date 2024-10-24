import { View, Text, Image, ScrollView } from 'react-native'
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { globalStyles } from '@/constants/GlobalStyle';

export default function SignUp() {
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>       

          <Text className="text-2xl font-semibold text-d mt-10 font-psemibold">
            Sign up to Staffin as...
          </Text>

          <View className='flex-row justify-around mt-8'>
            <Text><Link href={'/(auth)/sign-up/staff'}>Staff</Link></Text>
            <Text><Link href={'/(auth)/sign-up/admin'}>Admin</Link></Text>          
          </View>

                 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
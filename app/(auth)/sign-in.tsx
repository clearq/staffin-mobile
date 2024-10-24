import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useRouter, Link } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { globalStyles } from '@/constants/GlobalStyle';

export default function SignIn() {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>       

          <Text className="text-2xl font-semibold text-dark mt-10">
            Sign in to Staffin
          </Text>

          <View className='my-4 flex flex-col space-y-2 mb-8'>
            <Text>UserName:</Text>
            <Text>Password:</Text>
            <Text className='text- text-secondary font-semibold underline text-right'>
              <Link href={"/"}>
                Forgot password?
              </Link>
            </Text>
          </View>

          <CustomButton 
            onPress={() => router.push("/(tabs)/home")}
            title="Log In"
            containerStyles='bg-primary'
            textStyles='text-white'
          />

          <View className='mt-4 justify-center flex-row items-baseline space-x-2'>
            <Text className='text-center text-gray'>
              Don't have any account?                     
            </Text>
            <Text className='text-center text-secondary font-semibold underline'>
              <Link href={"/(auth)/sign-up"}>
                Sign up here
              </Link>
            </Text>
          </View>
                 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
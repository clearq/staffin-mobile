import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter, Link } from 'expo-router';

import { globalStyles } from '@/constants/GlobalStyle';

import CustomButton from '@/components/CustomButton'
import CustomForm from '@/components/CustomForm';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const StaffPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const router = useRouter();
  const dispatch = useAppDispatch();


  const { isLoading, isError } = useSelector((state:RootState) => state.auth);


  return (
    <SafeAreaView className=" h-full">
    <ScrollView>
      <View className={`flex justify-center ${globalStyles.container}`}>       

        <Text className="text-2xl font-semibold text-d mt-10">
          Sign up as Staff
        </Text>

        <View className='my-4 flex flex-col space-y-2 mb-8'>
          <Text>Username:</Text>
          <CustomForm 
            value={username}
            inputMode='text'
            onChangeText={(text) => setUsername(text)}
            placeholder='Username'
            showIcon = {false}
          />

          <Text>Email:</Text>
          <CustomForm 
            value={email}
            inputMode='email'
            onChangeText={(text) => setEmail(email)}
            placeholder='E-mail'
            showIcon = {false}
          />

          <Text>Password:</Text>     
          <CustomForm
            value={password} 
            inputMode='text'
            onChangeText={(text) => setPassword(text)}
            placeholder='Password'
            showIcon = {true}
          />

        </View>

        <CustomButton 
          onPress={() => router.push("/(tabs)/home")}
          title="Confirm"
          containerStyles='bg-primary'
          textStyles='text-white'
        />

        {isLoading && <ActivityIndicator size="small" color={'white'} />}

        <View className='mt-4 justify-center flex-row items-baseline space-x-2'>
          <Text className='text-center text-gray'>
            Already have an account?                     
          </Text>
          <Text className='text-center text-secondary font-semibold underline'>
            <Link href={"/(auth)/sign-in"}>
              Sign in here
            </Link>
          </Text>
        </View>
           
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default StaffPage
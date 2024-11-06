import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { useRouter, Link } from 'expo-router';

import CustomButton from '@/components/CustomButton';
import CustomForm from '@/components/CustomForm';
import { globalStyles } from '@/constants/GlobalStyle';

import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { signin } from '@/store/slice/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Colors from '@/constants/Colors';


export default function SignIn() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
 
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError, isAdmin } = useSelector((state:RootState) => state.auth);

  const handlePasswordChange = (text: string) => {
    const sanitizedText = text.replace(/\s/g, '');
    setPassword(sanitizedText);
  };

  const handleSignin = () => {
    const params = {
      email: email,
      password: password
    }

    dispatch(signin(params))
  };
  
  useEffect(() => {
    if (userData && !isError) { isAdmin 
      ? router.push('/admin/(tabs)/home')
      : router.push('/staff/(tabs)/home')
    }
  },[userData])

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>       

          <Text className="text-2xl font-semibold text-dark mt-10">
            Sign in to Staffin
          </Text>

          <View className='my-4 flex flex-col space-y-2 mb-8'>
            
            <Text>E-mail:</Text>
            <CustomForm 
              value={email}
              inputMode='email'
              onChangeText={(text) => {
                const sanitizedText = text.replace(/\s/g, '').toLowerCase()
                setEmail(sanitizedText)
              }}
              placeholder='E-mail'
              showIcon={false}        
            />

            <Text>Password:</Text>
            <CustomForm 
              value={password}
              inputMode='text'
              onChangeText={(text) => {
                const sanitizedText = text.replace(/\s/g, '')
                setPassword(sanitizedText)
              }}
              placeholder='Password'
              showIcon = {true}
            />

            <Text className='text- text-secondary font-semibold underline text-right'>
              <Link href={"/"}>
                Forgot password?
              </Link>
            </Text>
          </View>

          <CustomButton 
            onPress={handleSignin}
            title="Log In"
            containerStyles='bg-primary'
            textStyles='text-white'
          />

          {isLoading && <ActivityIndicator size="small" color={Colors.secondary} />} 

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
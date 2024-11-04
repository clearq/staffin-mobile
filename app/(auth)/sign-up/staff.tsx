import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter, Link } from 'expo-router';

import { globalStyles } from '@/constants/GlobalStyle';

import CustomButton from '@/components/CustomButton'
import CustomForm from '@/components/CustomForm';
import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { RootState } from '@/store/store';
import { signupStaff } from '@/store/slice/authSlice';


const StaffPage = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isError} = useAppSelector((state:RootState) => state.auth);

  //test
  //username:signupAsStaff
  //mail:test@mail.com
  //pass:staff
  //"roleId": 3, Id:"20000"

  const handleSignup = () => {
    if (!userName || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      isError === true
      return;
    }

    setErrorMessage(null);
    const params = {
      userName,
      email,
      password,
    };
    console.log('handleSignin is fire!',params)
    dispatch(signupStaff(params));
  };

  useEffect(() => {
    if (isSuccess && !isError) router.push('/staff/(tabs)/home')

  }, [isSuccess]);


  return (
    <SafeAreaView className=" h-full">
    <ScrollView>
      <View className={`flex justify-center ${globalStyles.container}`}>       
        { errorMessage && (         
          <Text className='text-red-500'>{errorMessage}</Text>         
        )}

        <Text className="text-2xl font-semibold text-d mt-10">
          Sign up as Staff
        </Text>

        <View className='my-4 flex flex-col space-y-2 mb-8'>
          <Text>Username:</Text>
          <CustomForm 
            value={userName}
            inputMode='text'
            onChangeText={(text) => setUserName(text)}
            placeholder='Username'
            showIcon = {false}
          />

          <Text>Email:</Text>
          <CustomForm 
            value={email}
            inputMode='email'
            onChangeText={(text) => {
              const sanitizedText = text.replace(/\s/g, '').toLowerCase()
              setEmail(sanitizedText)
            }}
            placeholder='E-mail'
            showIcon = {false}
          />

          <Text>Password:</Text>     
          <CustomForm
            value={password} 
            inputMode='text'
            onChangeText={(text) => {
              const sanitizedText = text.replace(/\s/g, '')
              setPassword(sanitizedText)}}
            placeholder='Password'
            showIcon = {true}
          />

        </View>

        <CustomButton 
          onPress={handleSignup}
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
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
import { signupAdmin } from '@/store/slice/authSlice';


const AdminPage = () => {
  const [companyName, setCompanyName] = useState('')
  const [orgNo, setOrgNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess } = useSelector((state:RootState) => state.auth);

    //test
    //companyName:testCo
    //orgNo:12345
    //mail:admin@mail.com
    //pass:admin1
    //"roleId": 1, Id:"20002"

  const handleSignup = () => {
    if (!companyName ||!orgNo || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      isError === true
      return;
    }

    setErrorMessage(null);
    const params = {
      companyName,
      organisationNumber: orgNo,
      email,
      password,
    };
    console.log('handleSignin is fire!',params)
    dispatch(signupAdmin(params));
  };

  useEffect(() => {
    if (isSuccess && !isError)  router.push("/admin/(tabs)/home");
    
  }, [isSuccess]);

  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>   
        { errorMessage && (         
          <Text className='text-red-500'>{errorMessage}</Text>         
        )}    

          <Text className="text-2xl font-semibold text-d mt-10">
            Sign up as Admin
          </Text>

          <View className='my-4 flex flex-col space-y-2 mb-8'>

            <Text>Company name:</Text>
            <CustomForm
              value={companyName} 
              inputMode='text'
              onChangeText={(text) => setCompanyName(text)}
              placeholder='Company name'
              showIcon = {false}
            />

            <Text>Organization number:</Text>
            <CustomForm 
              value={orgNo}
              inputMode='text'
              onChangeText={(text) => setOrgNo(text)}
              placeholder='Organization number'
              showIcon = {false}
            />

            <Text>Email:</Text>
            <CustomForm 
              value={email}
              inputMode='email'
              onChangeText={(text) => setEmail(text)}
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

export default AdminPage
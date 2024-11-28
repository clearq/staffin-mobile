import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { RootState } from '@/store/store';
import { signupAdmin, setError } from '@/store/slice/authSlice';

import { globalStyles } from '@/constants/GlobalStyle';
import Colors from '@/constants/Colors';

import { ErrorAlert } from '@/components/CustomAlert';
import CardGradient from '@/components/CardGradient';

import logo from '@/assets/images/main-logo.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FilledButtonLg, OutlineButtonIconLLg } from '@/components/CustomButtons';


const AdminPage = () => {
  const [companyName, setCompanyName] = useState('')
  const [organisationNumber, setOrganisationNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess } = useAppSelector((state:RootState) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    const params = {
      companyName,
      organisationNumber,
      email,
      password,
    };
    if (companyName === '' || organisationNumber === '' || email === '' || password === '') {
      dispatch(setError(true));
    } else {
      dispatch(setError(false))
      dispatch(signupAdmin(params));

      if (isLoading && !isError){
        console.log('is Loading?:', isLoading);
      }
      if(!isLoading && isError){
        console.log('is Errror?:', isError);
      }
    }
  };

  useEffect(() => {
    if (isSuccess && !isError)  router.push("/admin/(tabs)/home");
    
  }, [isSuccess]);

  return (
    <SafeAreaView style={globalStyles.authContainerThema}>
      <ScrollView>
        {/* Card */}
        <View style={globalStyles.authCardContainer}>

          <CardGradient />
        
          <Image 
            source={logo} 
            style={[globalStyles.logo]}
            resizeMode="contain" 
          />

          <Text style={[globalStyles.titleText, globalStyles.textWhite, globalStyles.centerText]}>
            Sign up as Admin
          </Text>

          <View style={[globalStyles.formContainer]}>  

            {isError && (
              <ErrorAlert 
                title = {'Invalid sign-up credentials'}
                msg = {'Please fill in all fields.'}
              />              
            )} 

            {/* Form: Company name */}
            <View style={[globalStyles.inputLine, globalStyles.borderWhite]}>
              <TextInput
                value={companyName}
                style={[globalStyles.inputText, globalStyles.textWhite]} 
                keyboardType='default'
                inputMode='text'
                placeholder='Company name'
                placeholderTextColor={Colors.white70}
                onChangeText={(text) => {
                  setCompanyName(text)
                }}
              />
            </View>

            {/* Form: Organisation number */}
            <View style={[globalStyles.inputLine, globalStyles.borderWhite]}>
              <TextInput
                value={organisationNumber}
                style={[globalStyles.inputText, globalStyles.textWhite]}       
                keyboardType='default'
                inputMode='text'
                placeholder='Organisation number'
                placeholderTextColor={Colors.white70}
                onChangeText={(text) => {
                  setOrganisationNumber(text)
                }}
              />
            </View>

            
            {/* Form: Email*/}
            <View style={[globalStyles.inputLine, globalStyles.borderWhite]}>
              <TextInput
                value={email}
                style={[globalStyles.inputText, globalStyles.textWhite]}
                keyboardType='email-address'
                inputMode='email'
                placeholder='Email'
                placeholderTextColor={Colors.white70}
                onChangeText={(text) => {
                  const sanitizedText = text.replace(/\s/g, '').toLowerCase()
                  setEmail(sanitizedText)
                }}
              />
            </View>

            {/* Form: Password */}
            <View style={[globalStyles.inputLine, globalStyles.borderWhite]}>
              <TextInput
                className='w-5/6'
                value={password}
                style={[globalStyles.inputText, globalStyles.textWhite]} 
                keyboardType='default'
                placeholder= 'Password'
                placeholderTextColor={Colors.white70}
                onChangeText={(text) => {
                  const sanitizedText = text.replace(/\s/g, '')
                  setPassword(sanitizedText)
                }}
                secureTextEntry={!showPassword}               
              />
              <TouchableOpacity 
                onPress={togglePasswordVisibility}
              >
                <MaterialCommunityIcons 
                  name={showPassword ? 'eye-off' : 'eye' }
                  size={24} 
                  color={Colors.white70} 
                />
              </TouchableOpacity>
            </View>        
          </View>

          <View style={globalStyles.btnGroup}>
            {/* Sign up button */}
            <FilledButtonLg 
              title='Sign up'
              color='black'
              onPress={handleSignup}
              textColor={Colors.textWhite}
            />

            {/* divider */}
            <View style={[globalStyles.divider,]} /> 

            {/* Sign up with LinkedIn button */}
            <OutlineButtonIconLLg
              title='Sign up With LinkedIn'
              color={Colors.textWhite}
              onPress={()=> console.log('hello Linkedin')}
              textColor={Colors.textWhite}
              icon='linkedin'
            />

          </View>

          {isLoading && <ActivityIndicator size="small" color={Colors.secondary} />} 

          <Text style={{textAlign: 'center', marginTop: 16}}>
            <Text style={[globalStyles.pText, globalStyles.textWhite]}>
              Already have an account?{' '}                    
            </Text>
            <Text style={[globalStyles.pText, globalStyles.textSecondary, globalStyles.textUnderline]}>
              <Link href={"/(auth)/sign-in"}>
                Sign in
              </Link>
            </Text>
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminPage
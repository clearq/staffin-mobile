import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

import { useAppSelector, useAppDispatch } from '@/store/reduxHooks';
import { RootState } from '@/store/store';
import { signupAdmin, setError } from '@/store/slice/authSlice';

import { globalStyles } from '@/constants/GlobalStyle';
import Colors from '@/constants/Colors';

import { ErrorAlert } from '@/components/UI/CustomAlert';
import CardGradient from '@/components/UI/CardGradient';

import logo from '@/assets/images/main-logo.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FilledButtonLg, OutlineButtonIconLLg } from '@/components/UI/CustomButtons';
import { PaasswordTextForm, ValidateTextForm } from '@/components/UI/CustomForm';


const AdminPage = () => {
  const [companyName, setCompanyName] = useState('')
  const [organisationNumber, setOrganisationNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [companyNameError, setCompanyNameError] = useState(false);
  const [organisationNumberError, setOrganisationNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess } = useAppSelector((state:RootState) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    const companyNameIsValid = companyName.trim() !== '';
    const organisationNumberIsValid = organisationNumber.trim() !== '';
    const emailIsValid = email.trim() !== '';
    const passwordIsValid = password.trim() !== '';

    setCompanyNameError(!companyNameIsValid);
    setOrganisationNumberError(!organisationNumberIsValid);
    setEmailError(!emailIsValid);
    setPasswordError(!passwordIsValid);

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
      <ScrollView contentContainerStyle={{flex:1, justifyContent:'center', alignItems:'center',}}>
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
                title={'Invalid Input'}
                msg={'Please check your input and try again. Make sure all fields are filled out correctly.'}
              />              
            )} 

            {/* Form: Company name */}
            <ValidateTextForm 
              value={companyName} 
              Placeholder='Company name' 
              color={Colors.white70} 
              onChangeText={(text) => {
                setCompanyName(text)
              }} 
              textColor={Colors.textWhite} 
              placeholderTextColor={Colors.white40} 
              inputError={companyNameError} 
              inputMode={'text'} 
            />
            

            {/* Form: Organisation number */}
            <ValidateTextForm 
              value={organisationNumber} 
              Placeholder='Organisation number' 
              color={Colors.white70} 
              onChangeText={(text) => {
                setOrganisationNumber(text)
              }} 
              textColor={Colors.textWhite} 
              placeholderTextColor={Colors.white40} 
              inputError={organisationNumberError} 
              inputMode={'text'} 
            />
            
            
            {/* Form: Email*/}
            <ValidateTextForm
              value={email}
              textColor={Colors.textWhite}
              inputMode='email'
              Placeholder='Email'
              placeholderTextColor={Colors.white40}
              onChangeText={(text:string) => {
                const sanitizedText = text.replace(/\s/g, '').toLowerCase()
                setEmail(sanitizedText) 
              }}
              color={Colors.white70}
              inputError={emailError}
            />

            {/* Form: Password */}
            <PaasswordTextForm 
              value={password}
              textColor={Colors.textWhite}
              inputMode='text'
              Placeholder='Password'
              placeholderTextColor={Colors.white40}
              onChangeText={(text:string) => {
                const sanitizedText = text.replace(/\s/g, '')
                setPassword(sanitizedText)
              }}
              color={Colors.white70}
              inputError={passwordError}
            />

          <View style={globalStyles.btnGroup}>
            {/* Sign up button */}
            <FilledButtonLg 
              title='Sign up'
              color='black'
              onPress={handleSignup}
              textColor={Colors.textWhite}
            />

            {/* divider */}
            {/* <View style={[globalStyles.divider,]} />  */}

            {/* Sign up with LinkedIn button */}
            {/* <OutlineButtonIconLLg
              title='Sign up With LinkedIn'
              color={Colors.textWhite}
              onPress={()=> console.log('hello Linkedin')}
              textColor={Colors.textWhite}
              icon='linkedin'
            /> */}

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
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminPage
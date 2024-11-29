import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

import { useAppDispatch } from '@/store/reduxHooks';
import { setError, signin } from '@/store/slice/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { globalStyles } from '@/constants/GlobalStyle';
import Colors from '@/constants/Colors';

import { ErrorAlert, SuccessAlert, WarningAlert } from '@/components/UI/CustomAlert';
import { FilledButtonLg, OutlineButtonIconLLg } from '@/components/UI/CustomButtons';
import { CheckBox } from '@rneui/themed';
import CardGradient from '@/components/UI/CardGradient';

import logo from '@/assets/images/main-logo.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaasswordTextForm, ValidateTextForm } from '@/components/UI/CustomForm';



export default function SignIn() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
 
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError, isAdmin } = useSelector((state:RootState) => state.auth);


  const handleSignin = () => {
    const emailIsValid = email.trim() !== '';
    const passwordIsValid = password.trim() !== '';

    setEmailError(!emailIsValid);
    setPasswordError(!passwordIsValid);

    const params = {
      email: email,
      password: password
    };
    if (email === '' || password === '') {
      dispatch(setError(true));
    } else {
      dispatch(setError(false)); 
      dispatch(signin(params)); 

      if (isLoading && !isError){
        console.log('is Loading?:', isLoading);
      }
      if(!isLoading && isError){
        console.log('is Errror?:', isError);
      }
    }
  };
  
  useEffect(() => {
    if (userData && !isError) { isAdmin 
      ? router.push('/admin/(tabs)/home')
      : router.push('/staff/(tabs)/home')
    }
  },[userData])

  return (
    <SafeAreaView style={globalStyles.authContainerThema}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
        {/* Card */}
        <View style={[globalStyles.authCardContainer,]}>  

          <CardGradient /> 

            <Image 
              source={logo} 
              style={[globalStyles.logo]}
              resizeMode="contain" 
            />
      
            <Text style={[globalStyles.titleText, globalStyles.textWhite, globalStyles.centerText]}>
              Sign In
            </Text>

            <View style={[globalStyles.formContainer]}>

              {isError && (
              
                <ErrorAlert
                  title={'Invalid Input'}
                  msg={'Please check your input and try again. Make sure all fields are filled out correctly.'} 
                />
                     
              )}

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

             
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <CheckBox
                  checked={checked}
                  onPress={toggleCheckbox}
                  iconType="material-community"
                  checkedIcon="checkbox-outline"
                  uncheckedIcon={'checkbox-blank-outline'}
                  checkedColor={Colors.success} 
                  title={'Remember me'} 
                  containerStyle={{
                    backgroundColor: 'none',
                    paddingLeft: 0,
                    marginLeft: 0,
                    marginTop:0,
                    paddingTop:0,
                  }}
                  textStyle={{
                    color:`${Colors.textWhite}`,
                    fontSize: 16,
                    fontWeight: 'regular',
                    marginLeft: 4,
                  }} 
                />
                
                <Text 
                  style={[globalStyles.pText, globalStyles.textSecondary, globalStyles.textUnderline,]}
                >
                  <Link href={"/"}>
                    Forgot password?
                  </Link>
                </Text>
              </View>

            </View>

            {/* Sign in button */}
            <FilledButtonLg
              title='Sign in'
              color='black'
              onPress={handleSignin}
              textColor={Colors.textWhite}
            />

            {/* divider */}
            <View style={[globalStyles.divider,]} /> 

            {/* Sign in with LinkedIn button */}
            <OutlineButtonIconLLg
              title='Sign in With LinkedIn'
              color={Colors.textWhite}
              onPress={()=> console.log('hello Linkedin')}
              textColor={Colors.textWhite}
              icon='linkedin'
            />
          
            {isLoading && <ActivityIndicator size="small" color={Colors.secondary} />} 
            

            <Text style={{textAlign: 'center', marginTop: 16}}>
              <Text style={[globalStyles.pText, globalStyles.textWhite]}>
                Don't have any account?{" "}                   
              </Text>
              <Text style={[globalStyles.pText, globalStyles.textSecondary, globalStyles.textUnderline]}>
                <Link href={"/(auth)/sign-up"}>
                  Sign up
                </Link>
              </Text>
            </Text> 
                  
        </View>
    
      </View>
    </SafeAreaView>
  )
}


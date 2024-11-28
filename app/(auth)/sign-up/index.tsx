import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { globalStyles } from '@/constants/GlobalStyle';

import CardGradient from '@/components/CardGradient';
import logo from '@/assets/images/main-logo.png'
import { FilledButtonLg } from '@/components/CustomButtons';
import Colors from '@/constants/Colors';
 

export default function SignUp() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={globalStyles.authContainerThema}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
        {/* Card */}
        <View style={globalStyles.authCardContainer}> 
          
          <CardGradient /> 

          <Image 
            source={logo} 
            style={[globalStyles.logo]}
            resizeMode="contain" 
          /> 

          <Text style={[globalStyles.titleText, globalStyles.textWhite, globalStyles.centerText]}>
            Sign up to Staffin as...
          </Text>

          <View style={[globalStyles.formContainer]}>

            <View style={globalStyles.btnGroup}>
              {/* Sign up as a staff */}
              <FilledButtonLg 
                title='Staff'
                color={Colors.textWhite}
                onPress={() => router.push("/(auth)/sign-up/staff")}
                textColor='black'
              />

              <FilledButtonLg 
                title='Admin'
                color={Colors.secondary}
                onPress={() => router.push("/(auth)/sign-up/admin")}
                textColor='black'
              />

            </View>

            <Text className='text-base mt-4 justify-center flex-row items-baseline'>
              <Text className='text-center text-white'>
              Already have an account?{" "}                   
              </Text>
              <Text className='text-center text-secondary font-semibold underline'>
                <Link href={"/(auth)/sign-in"}>
                  Sign In
                </Link>
              </Text>
            </Text> 
        
          </View>
                 
        </View>
      </View>
    </SafeAreaView>
  )
}
// Start page
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import { useRouter } from 'expo-router';

import logo from '@/assets/images/main-logo.png'
import { globalStyles } from '@/constants/GlobalStyle';
import { FilledButtonLg } from '@/components/CustomButtons';
import Colors from '@/constants/Colors';


const Start = () => {
  const router = useRouter();

  return (
   
    <SafeAreaView style={[globalStyles.container, {backgroundColor: 'black'}]}> 
      <View style={{flexDirection:'column', height: "100%", justifyContent:'center',}}>

        <View style={{flexDirection:'column'}}>
          <Image 
            source={logo} 
            style={globalStyles.logoFullSize}
            resizeMode="contain" 
          />
          
          <View style={globalStyles.btnGroup}>

            <FilledButtonLg 
              title='Sign in'
              color={Colors.textWhite}
              onPress={() => router.push("/(auth)/sign-in")}
              textColor='black'
            />

            <FilledButtonLg 
              title='Sign up'
              color={Colors.secondary}
              onPress={() => router.push("/(auth)/sign-up")}
              textColor='black'
            />
          
          </View>
        </View>
      </View>  
    </SafeAreaView>
  )
}

export default Start

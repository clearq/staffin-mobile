import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { globalStyles } from '@/constants/globalStyles'
import logo from '../assets/Images/icon.png'
import { ButtonLg } from '@/components/UI/CustomButton'
import { colors } from '@/constants/colors'

import { useAppSelector } from "@/store/reduxHooks";
import { login, getCurrentUser } from "@/store/Slice/authSlice";

const onboarding = () => {
  const router = useRouter();
  const { user, authUser } = useAppSelector((state) => state.auth);
  
  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.paddingX, {backgroundColor: 'black'}]}> 
      <View style={{flexDirection:'column', height: "100%", justifyContent:'center',}}>

        <View style={{flexDirection:'column'}}>
          <Image 
            source={logo} 
            style={globalStyles.logoFullSize}
            resizeMode="contain" 
          />
          
          <View style={[globalStyles.btnGroup, globalStyles.paddingX]}>

            <ButtonLg 
              title='Sign in'
              containerStyles={globalStyles.btnWhite}
              handlePress={() => router.push("/(auth)/sign-in")}
              textColor={colors.black}
              isLoading={false}
            />

            <ButtonLg 
              title='Sign up'
              containerStyles={globalStyles.btnOrange}
              handlePress={() => router.push("/(auth)/sign-up")}
              textColor={colors.black}
              isLoading={false}
            />
          
          </View>
        </View>
      </View>  
    </SafeAreaView>
  )
}

export default onboarding

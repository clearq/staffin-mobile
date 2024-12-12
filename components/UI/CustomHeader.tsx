import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import logo from '../../assets/Images/favicon.png'
import { colors } from '@/constants/colors'
import { useAppDispatch } from '@/store/reduxHooks'
import { useRouter } from 'expo-router'
import { logout } from '@/store/Slice/authSlice'

const CustomHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async() => {
    try {
      await dispatch(logout()).unwrap(); 
      router.push('/(auth)/sign-in');
      console.log('logout')
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:colors.primaryLight, width:'100%', height:70, paddingHorizontal:16, alignItems:'center' }}>
      <Image source={logo} width={40} height={40} resizeMode='cover'/>

      <TouchableOpacity
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader
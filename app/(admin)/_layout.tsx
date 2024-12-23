import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Slot, Stack, useRouter, } from 'expo-router'
import { useState } from 'react';

import logo from '../../../assets/Images/favicon.png'
import { useAppDispatch } from '@/store/reduxHooks';
import { logout } from '@/store/slice/authSlice';
import CustomHeader from '@/components/UI/CustomHeader';
import { colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HeaderMenuModal from '@/components/UI/HeaderMenuModal';
import React from 'react';

const AdminLayout = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  //Logout
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async() => {
    try {
      await dispatch(logout()).unwrap(); 
      router.push('/(auth)/sign-in');
      console.log('logout')
      setOpenModal(false)
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <>
      <Stack
        screenOptions={{
          header: () => <CustomHeader handlePress={() => {
            setOpenModal(true)
            console.log(openModal);         
          }} />
        }}
      >
  
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown:false
          }}
        />

      </Stack>

      {openModal &&
        <HeaderMenuModal
          onClose={() => setOpenModal(false)} 
          handleLogout={handleLogout}
        />                
      }
    </>
  )
}

export default AdminLayout
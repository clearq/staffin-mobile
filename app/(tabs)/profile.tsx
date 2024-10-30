import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import StaffProfile from '../user/staff/staffProfile';
import AdminProfile from '../user/admin/adminProfile';


export default function Tab() {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  return (
    <View>
      <Text>User Profile</Text>

      { isAdmin ? (
        <AdminProfile />
      ):(
        <StaffProfile />
      )} 
    </View>
  );
}
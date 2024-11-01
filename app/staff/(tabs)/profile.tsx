import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { globalStyles } from '@/constants/GlobalStyle';
import StaffProfile from '@/app/pageComponents/staffProfile';


export default function Tab() {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  return (
    <ScrollView className={`${globalStyles.container}`}>
      <Text>User Profile</Text>
      <StaffProfile />
    </ScrollView>
  );
}
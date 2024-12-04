import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { globalStyles } from '@/constants/GlobalStyle';
import UserProfile from '@/app/pageComponents/profile/userProfile';


export default function Tab() {
  const userId = useSelector((state: RootState) => state.auth.userData?.id); 
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  return (
    <ScrollView className={`${globalStyles.container}`}>
      { userId && <UserProfile userId={userId}/> }
    </ScrollView>
  );
}
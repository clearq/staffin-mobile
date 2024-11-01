import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUser } from '@/store/slice/userSlice';
import { useAppDispatch } from '@/store/reduxHooks';


const StaffProfile = () => {
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError } = useSelector((state: RootState) => state.user);
  const authData = useSelector((state: RootState) => state.auth); 
 
  
  useEffect(() => {
    if (authData.userData?.id) {
      dispatch(fetchUser(authData.userData.id));
    }
  }, [authData.userData]);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>StaffProfile</Text>
        <Text>FirstName: {userData?.firstName}</Text>
        <Text>LastName: {userData?.lastName}</Text>
        <Text>Email: {userData?.email}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default StaffProfile
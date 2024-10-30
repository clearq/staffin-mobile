import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUser } from '@/store/slice/userSlice';
import { useAppDispatch } from '@/store/reduxHooks';



export default function Tab() {
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError } = useSelector((state: RootState) => state.user);
  const authData = useSelector((state: RootState) => state.auth); 
  const isAdmin = authData.isAdmin;

  useEffect(() => {
    if (authData.userData?.id) {
      dispatch(fetchUser(authData.userData.id));
    }
  }, [authData.userData]);

  // if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  // if (isError) return <Text>Error loading profile data.</Text>;

  console.log('authData', authData)
  console.log('userData', userData)

  return (
    <SafeAreaView>
      <ScrollView>
        { isAdmin ? (
          <Text>Hello Admin ID:{userData?.id}</Text>
        ):(
          <Text>Hello Staff ID:{userData?.id}</Text>
        )} 
      </ScrollView>
    </SafeAreaView>
  );
}



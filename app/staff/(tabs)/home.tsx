import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUser } from '@/store/slice/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { Stack } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import Colors from '@/constants/Colors';
import Feed from '@/app/pageComponents/feed';



export default function Tab() {
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError} = useSelector((state: RootState) => state.user);
  
  

  return (
    <SafeAreaView >  
      <ScrollView>
                     
        <Text>Hello Staff ID:{userData?.id}</Text>
        <Feed />
       
      </ScrollView>
    </SafeAreaView>
  );
}



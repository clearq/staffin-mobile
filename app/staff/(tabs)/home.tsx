import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { globalStyles } from '@/constants/GlobalStyle'


import Feed from '@/app/pageComponents/feed';



export default function Tab() {

  const { userData, isLoading, isError} = useSelector((state: RootState) => state.user);
  
  

  return (
    <SafeAreaView className={`${globalStyles.container}`}>  
      <ScrollView>
                     
        <Text>Hello Staff ID:{userData?.id}</Text>
        <Feed />
       
      </ScrollView>
    </SafeAreaView>
  );
}



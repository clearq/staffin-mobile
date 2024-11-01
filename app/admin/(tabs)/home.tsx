import { Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { globalStyles } from '@/constants/GlobalStyle'

import Feed from '@/app/pageComponents/feed';
import Colors from '@/constants/Colors';


export default function Tab() {
  const { userData, isLoading, isError} = useSelector((state: RootState) => state.user);
  
  
  return (
    <ScrollView className={`${globalStyles.container}`}>  

      {isLoading &&
        <ActivityIndicator size="small" color={Colors.secondary} />
      } 
                    
      <Text>Hello Staff ID:{userData?.id}</Text>
      <Feed />
      
    </ScrollView>
  );
}



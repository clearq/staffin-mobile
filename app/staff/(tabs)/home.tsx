import { Text, ScrollView, ActivityIndicator, RefreshControl, View} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { globalStyles } from '@/constants/GlobalStyle'


import Feed from '@/app/pageComponents/feed';
import Colors from '@/constants/Colors';



export default function Tab() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { userData, isLoading, isError} = useSelector((state: RootState) => state.user);

 
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  

  return (
    <ScrollView className={`${globalStyles.container}`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >  

      {!userData && isLoading &&
        <ActivityIndicator size="small" color={Colors.secondary} />
      } 
                    
      <Text>Hello Staff ID:{userData?.id}</Text>
      <Feed />
      
    </ScrollView>
  );
}



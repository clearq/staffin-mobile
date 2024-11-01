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
import { fetchFeed } from '@/store/slice/communitySlice';



export default function Feed() {

  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { posts } = useAppSelector((state) => state.feed);



  useEffect(() => {
    if (userData?.token) {
      dispatch(fetchFeed());
    }
  }, [userData]);

  

  return (
    <View >  
      <Text>Feed:</Text>                    
      { posts && (
        posts.map((post) => (
          <View key={post.postId}> 
            <Text>
              {post.authorName} 
            </Text>

            <Text>
              {post.content}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}



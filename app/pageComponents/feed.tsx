import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { fetchFeed } from '@/store/slice/communitySlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { fetchUser } from '@/store/slice/userSlice';

import FeedCard from '@/components/UI/FeedCard';


// Feed page
export default function Feed() {
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const authData = useSelector((state: RootState) => state.auth); 
  const { posts } = useAppSelector((state) => state.feed);
  

  useEffect(() => {
    if (authData.userData?.token) {
      dispatch(fetchFeed());
    }
    if (authData.userData?.id) {
      dispatch(fetchUser(authData.userData.id));
    }
  }, [userData]);


  return (
    <View>    
      <Text className='text-lg font-pbold mb-4'>Feed:</Text>
      { posts && (
        [...posts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((post) => (
         
          <FeedCard key={post.postId} post={post} />
      
        ))
      )}     
    </View>
  );
}



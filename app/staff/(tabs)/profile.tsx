import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { globalStyles } from '@/constants/GlobalStyle';
import UserProfile from '@/app/pageComponents/profile/userProfile';
import ProfileHeader from '@/app/pageComponents/profile/profileHeader';
import { fetchUser } from '@/store/slice/userSlice';
import { fetchUserPosts } from '@/store/slice/communitySlice';
import { useAppDispatch } from '@/store/reduxHooks';


const menus = [  
  {
    id:1,
    title: 'Overview',
    link: '#'
  },
  {
    id:2,
    title: 'Activity',
    link: '#'
  },
  {
    id:3,
    title: 'Document',
    link: '#'
  },
  {
    id:4,
    title: 'Edit',
    link: '#'
  },    
]

export default function Tab() {
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const { userPosts } = useSelector((state: RootState) => state.feed)
  const currentUserId = userData?.id
  
  useEffect(() => {
    if (currentUserId && userData) {
      dispatch(fetchUser(currentUserId));
      dispatch(fetchUserPosts(currentUserId)); 
      console.log('inside ue');
      
    }
    console.log('test');
    
  }, [currentUserId]);

  return (
    <ScrollView style={globalStyles.container}>
      { userData && currentUserId && userPosts && ( 
        <View>
          <ProfileHeader name={`${userData?.firstName} ${userData?.lastName}`} menus={menus} data={userData} />
          <UserProfile 
            data={userData} 
            posts={userPosts}/> 
        </View>
      )}
    </ScrollView>
  );
}

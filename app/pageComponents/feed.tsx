import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUser } from '@/store/slice/userSlice';
import { fetchFeed } from '@/store/slice/communitySlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from '@/constants/GlobalStyle';
import Colors from '@/constants/Colors';

interface props {
  title: string
  icon: 'cards-heart-outline'| 'cards-heart' | 'comment-text-outline' | 'repeat' | 'share-variant-outline'
  size: number
  color: string
}

function ActionButton ({title, icon, size, color}: props) {
  return(
    <>
      <TouchableOpacity
        className='flex flex-col justify-center items-center'
        onPress={()=> {console.log(`action: ${title}`);
        }}
      >
        <MaterialCommunityIcons name={icon} size={size} color={color} /> 
        <Text className={'text-xs text-gray-500 text-center'}>{title}</Text>
      </TouchableOpacity>
    </>
  )
}


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
      <Text className='text-lg font-pbold mb-4'>Feed:</Text>                    
      { posts && (
        posts.map((post) => (
          <View 
            key={post.postId}
            className='bg-bgWhite p-4 drop-shadow-md mb-2 '
          > 
            {/* Card header */}
            <View className='flex flex-row'>

              {/* Avatar section */}
              <View>
                <View className='bg-slate-200 w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                  <MaterialCommunityIcons name="account" size={24} color="gray" />
                </View>
              </View>

              {/* Texts section*/}
              <View className='ml-2'>
                <Text className='text-base font-bold'
                >
                  {post.authorName} 
                </Text>
                <Text className='text-xs text-gray-500'>{post.createdAt}</Text>

              </View>
            </View>

            {/* Card body */}
            <View className='mt-2'>
              <Text className={globalStyles.pText}>
                {post.content}
              </Text>            

              { post.image &&
                <Image 
                  source={{ uri: post.image }}
                />
              }
            </View>

            {/* User action results */}
            <View
              className='flex flex-row justify-between'
            >
              <Text className='text-gray-500 text-sm'>
                {post.likeCount} likes
              </Text>
           
              <Text className='text-gray-500 text-sm'>
                {post.commentCount} comments · {post.sharedCount} reposts
              </Text>
             
            </View>

            {/* Card footer -- User actions */}
            <View
              className='flex flex-row justify-between pt-2 border-t border-borderColor'
            >

              {/* Like action */}
              <ActionButton 
                title = {'Like'}
                icon = {'cards-heart-outline'}
                size = {16}
                color ={'gray'}
              />

              {/* Comment action */}
              <ActionButton 
                title = {'Comment'}
                icon = {'comment-text-outline'}
                size = {16}
                color ={'gray'}
              />
    
              {/* Repost action */}
              <ActionButton 
                title = {'Repost'}
                icon = {'repeat'}
                size = {16}
                color ={'gray'}
              />
            
              {/* Share action */}
              <ActionButton 
                title = {'Share'}
                icon = {'share-variant-outline'}
                size = {16}
                color ={'gray'}
              />

            </View>

          </View>
        ))
      )}
    </View>
  );
}



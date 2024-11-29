import { View, Text, Image, TouchableOpacity,  KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { addPostComment, fetchComments, fetchFeed, likePost, unlikePost } from '@/store/slice/communitySlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { fetchUser } from '@/store/slice/userSlice';

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from '@/constants/GlobalStyle';
import formatTime from '@/lib/formatTime';
import InputMessage from '@/components/UI/InputMessage';
import FeedCard from '@/components/UI/FeedCard';


interface props {
  title: string;
  icon: 'cards-heart-outline'| 'cards-heart' | 'comment-text-outline' | 'repeat' | 'share-variant-outline';
  size: number;
  color: string;
  onPress: () => void;
}

// ActionButtonComponent
function ActionButton ({title, icon, size, color, onPress}: props) {
  return(
    <>
      <TouchableOpacity
        className='flex flex-col justify-center items-center'
        onPress={onPress}
      >
        <MaterialCommunityIcons name={icon} size={size} color={color} /> 
        <Text className={'text-xs text-gray-500 text-center'}>{title}</Text>
      </TouchableOpacity>
    </>
  )
}

// Feed page
export default function Feed() {
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError } = useSelector((state: RootState) => state.user);
  const authData = useSelector((state: RootState) => state.auth); 
  const { posts, comments } = useAppSelector((state) => state.feed);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false)
  

  useEffect(() => {
    if (authData.userData?.token) {
      dispatch(fetchFeed());
    }
    if (authData.userData?.id) {
      dispatch(fetchUser(authData.userData.id));
    }
  }, [userData]);

 
  const handleToggleComments = (postId: number) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
      if (!comments[postId]) {
        dispatch(fetchComments({
          postId, comment}));
      }
    }
  };

  const handleAddComment = async(selectedPostId:number) => {
    if (!comment) {
      isError === true
      console.log('The comment box is blank')
    };
    const params = {
      postId: selectedPostId,
      comment,
    };

    const resultAction = await dispatch(addPostComment(params));

    if (addPostComment.fulfilled.match(resultAction)) {
      dispatch(fetchComments({
        postId: selectedPostId,
        comment
      }));
    }
    setOpenModal(false);
  };


  return (
    <View>    
      <Text className='text-lg font-pbold mb-4'>Feed:</Text>
      { posts && (
        [...posts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((post) => (
          <View key={post.postId}>
            <FeedCard post={post} />
          </View>
        ))
      )}

      
    
    </View>
  );
}



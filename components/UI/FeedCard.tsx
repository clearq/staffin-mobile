import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { addPostComment, fetchComments, fetchFeed, likePost, Post, unlikePost } from '@/store/slice/communitySlice';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { fetchUser } from '@/store/slice/userSlice';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from '@/constants/GlobalStyle';
import formatTime from '@/lib/formatTime';
import InputMessage from '@/components/UI/InputMessage';
import ActionButton from './ActionButton';
import Colors from '@/constants/Colors';
import { User } from '@/constants/types/UserType';

const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
    flexDirection:'column',
    columnGap:8,
    backgroundColor: `${Colors.white70}`,
    padding:16,
    marginTop:16,
  },
  cardHeader:{
    flexDirection:'row',
    justifyContent:'flex-start',
    gap:8,
  },
  cardBody:{
    marginTop:16,
    flexDirection: 'column',
  },
  buttonGroup:{
    flexDirection: 'row',
    gap:16,
  },
  cardFooter:{
    flex:1,
    alignItems:'center',
    position:'relative',
  },
})


interface props {
  post : Post
}

const FeedCard = ({post, }: props) => {
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError } = useSelector((state: RootState) => state.user);
  const { comments } = useAppSelector((state) => state.feed);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false)
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    if (post.userId && (!userData || (userData && userData.id !== post.userId))) {
      dispatch(fetchUser(post.userId)).then((action) => {
        if (action.payload) {
          setUserProfile(action.payload);
        }
      });
    } else {
      setUserProfile(userData);
    }
  }, [post.userId, userData]);

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
    <View
      style={[styles.cardContainer]}
    > 
      {/* Card header */}
      <View style={[styles.cardHeader]}>

        {/* Avatar */}
        <UserIconPost 
          authorId={post.userId} 
          profileImage={userProfile?.profileImage}
        />

        {/* User Info*/}
        <View className='ml-2'>
          <Text className='text-base font-bold'
          >
            {post.authorName} 
          </Text>
          <Text className='text-xs text-gray-500'>
          {formatTime(post.createdAt)}
          </Text>

        </View>
      </View>

      {/* Card body */}
      <View style={[styles.cardBody]}>

        <Text style={globalStyles.pText}>
          {post.content}
        </Text>            

        { post.image &&
          <Image 
            source={{ uri: post.image }}
            style={{width:'100%', height:'auto'}}
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

        <View className='flex flex-row'>
          <TouchableOpacity onPress={() => handleToggleComments(post.postId)}>
            <Text className='text-gray-500 text-sm'>
              {post.commentCount} comments
            </Text>                
          </TouchableOpacity>

          <Text className='text-gray-500 text-sm'> · </Text>
          <Text className='text-gray-500 text-sm'>{post.sharedCount} reposts</Text>
        
        </View>           
      </View>

      {/* Card footer -- User actions */}
      <View
        className='flex flex-row justify-between pt-2 border-t border-borderColor'
      >

        {/* Like action */}
        <ActionButton 
          title = {post.isLiked ? 'Liked' :'Like'}
          icon = {post.isLiked ? 'cards-heart' : 'cards-heart-outline'}
          size = {16}
          color ={post.isLiked ? 'red' : 'gray'}
          onPress={() => {
            if (post.isLiked) {
              dispatch(unlikePost(post.postId));
            } else {
              dispatch(likePost(post.postId));
            }
          }}
        />

        {/* Comment action */}
        <ActionButton 
          title = {'Comment'}
          icon = {'comment-text-outline'}
          size = {16}
          color ={'gray'}
          onPress={() => {
            setOpenModal(true)
            setSelectedPostId(post.postId)             
          }}
        />
        
        {/* Repost action */}
        <ActionButton 
          title = {'Repost'}
          icon = {'repeat'}
          size = {16}
          color ={'gray'}
          onPress={() => {}}
        />
      
        {/* Share action */}
        <ActionButton 
          title = {'Share'}
          icon = {'share-variant-outline'}
          size = {16}
          color ={'gray'}
          onPress={() => {}}
        />
      </View>

      {openModal && selectedPostId === post.postId && (
        <KeyboardAvoidingView>
          <InputMessage 
            onPress={() => {handleAddComment(post.postId)}}
            onChangeText={(text:string) => setComment(text)}
          />           
        </KeyboardAvoidingView>
      )}

      {selectedPostId === post.postId && comments[post.postId] && (
        <View className='mt-2'>
          {comments[post.postId].map((comment) => (
            <View key={comment.commentId} className='mt-2 border-t border-gray-200 pt-2'>
              <Text className='text-xs font-semibold'>
                {comment.firstName} {comment.lastName}
              </Text>
              <Text className='text-xs text-gray-500'>{formatTime(comment.createdAt)}</Text>
              <Text className='text-xs'>{comment.content}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default FeedCard



// User Icon for Post
interface postProps{
  authorId:number
  profileImage?: string
}

const UserIconPost = ({authorId, profileImage}:postProps) => {
  
  return (
    <View 
      style={{
        justifyContent:'center',
        alignItems:'center',
        width: 68,
        height: 68,
        backgroundColor: 'white',
        borderRadius: '100%'
      }}
    >
      { profileImage 
        ? <Image 
            source={{uri: profileImage}} 
            style={{
              width: 60,
              height: 60,
              borderRadius: '100%'
            }}
          />
          
        : (
          <View
            style={{
              backgroundColor:`${Colors.primaryLight}`,
              width: 60,
              height: 60,
              borderRadius: '100%',
              justifyContent:'center',
              alignItems:'center',
            }}
          >
            <MaterialCommunityIcons name="account" size={36} color="gray" />
          </View>
        )
      }
    </View>
  )
}




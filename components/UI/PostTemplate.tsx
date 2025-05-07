import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import pageStyle from '@/constants/Styles'
import { theme } from '@/constants/Theme'
import { Divider, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IPost, IUser } from '@/types'
import { Colors } from '@/constants/Colors'
import { useAuth } from '@/contexts/authContext'
import { fetchImageFromCDN } from '@/utils/CDN-action'
import { useQuery } from '@tanstack/react-query'
import { likePost, unlikePost } from '@/api/backend'
import { CompanyAvatar, ProfileAvatar } from './ProfileAvatar'
import { yearMonthDate } from '@/utils/dateFormat'
import SharePostDialog from '../Pages/Community/Dialogs/SharePostDialog'
import CommentsDialog from '../Pages/Community/Dialogs/CommentsDialog'
import { usePostLike } from '@/hooks/usePostLike'
import { useFollow } from '@/hooks/useFollow'


interface Props {
  post: IPost
  postsRefetch: () => void
  postIsLoading: boolean
  handleFollowAction: (id: number) => void
  following: []
}

const PostTemplate = ({post, postsRefetch, postIsLoading, handleFollowAction}: Props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const { isLoading, authState:{ userData, userId }} = useAuth();
  const { liked, toggleLike } = usePostLike(post.likes, post.postId, (Number(userId)), postsRefetch);
  const { followed, toggleFollow } = useFollow()
  const [postImages, setPostImages] = useState<string[]>([])

  
  const [openComments, setOpenComments] = useState(false)
  const [openComment, setOpenComment] = useState(false)
  const [openSharePostDialog, setOpenSharePostDialog] = useState(false)

  useEffect(() => {
    const fetchUrls = async () => {
      if (post?.images?.length > 0) {
        const urls = await Promise.all(
          post.images.map((imageKey) =>
            fetchImageFromCDN({
              userId: post.userId,
              contentFolder: "posts_images",
              key: imageKey
            })
          )
        );
  
        setPostImages(urls); // assumes fetchImageFromCDN returns a string (URL)
      }
    };
 
    fetchUrls()
   
  },[post.likes, userId])



  const handleSharePost = async (id: number) => {

  }

  return (
    <View 
    style={{
      ...styles.postContainer,
      backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black
    }}
    >
      {postIsLoading && <Text>Loading...</Text>}
      
      {/* Header */}
      <View style={{...styles.headerContainer}}>

        <View style={{...styles.userContainer}}>
         
          <ProfileAvatar
            userId={post.userId}
            image={""}
            size={40}
            handleUpdate={() => {}}
          />
          
          <View style={{...styles.headerTextGroup}}>
            <Text 
              style={{
                ...pageStyle.headline03, 
                color: theme.colors.grey0
              }}
            >
              {post?.authorName ?  post?.authorName : ""}
            </Text>

            <Text
              style={{
                ...pageStyle.xsText, 
                color: theme.colors.grey0,
              }}
            >
              {post?.createdAt ? yearMonthDate(post?.createdAt) : ""}
            </Text>
          </View>
        </View>

        <View style={{...styles.headerButtonGroup}}>
          <TouchableOpacity
            style={{
              ...styles.followButton,
              borderColor: theme.colors.primary,
              backgroundColor: followed ? theme.colors.primary : "transparent"
            }}
            onPress={() => handleFollowAction(post.userId)}
          >
            <Text
              style={{
                ...pageStyle.button16,
                color: followed ? theme.colors.white : theme.colors.primary,
              }}
            >
              {followed ? t("unfollow") : t("follow")}
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <Divider />

      {/* Body */}
      <View style={{...styles.bodyContainer}}>  

        <View style={{...styles.contentContainer}}>
          
          {/* Text content */}
          <Text
            style={{color: theme.colors.grey0}}
          >
            {post?.content ? post?.content : ""}
          </Text>

          {/* Image content */}
          {postImages.length > 0 && postImages.map((uri, index) => (
            <View key={index}>
              <Image source={{ uri: uri }} style={{height: 250, resizeMode: 'contain'}} />
            </View>
          ))}
          
          {/* Reactions */}
          <View style={{...styles.reactionGroup}}>
            <View style={{...styles.countsGrop}}>
              <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>{post?.likeCount ? post?.likeCount : 0}</Text>
              <MaterialCommunityIcons name='heart' size={16} color={"rgb(255, 45, 85)"} />
            </View>
            
            <View style={{flexDirection: 'row', gap: theme.spacing.xs, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setOpenComments(true)}
              >
                <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>
                  {`${post?.commentCount ? post?.commentCount : 0 } comments`}
                </Text>
              </TouchableOpacity>

              <Text>{` • `}</Text>

              <TouchableOpacity>
                <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>
                  {`${post?.sharedCount ? post?.sharedCount : 0 } shares`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>          
      </View>

      <Divider />

      {/* Footer */}
      <View style={{...styles.footerContainer}}>
        {/* Like */}
        <TouchableOpacity 
          style={{...styles.footerButtonItem}}
          onPress={toggleLike}
        >
          <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? "rgb(255, 45, 85)" : theme.colors.grey3} />
          <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("like")}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{...styles.footerButtonItem}}
          onPress={() => {
            setOpenComment(true)
            setOpenComments(true)
          }}
        >
          <MaterialCommunityIcons name='comment-text-outline' size={24} color={theme.colors.grey3} />
          <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("comment")}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{...styles.footerButtonItem}}
          onPress={() => setOpenSharePostDialog(true)}
        >
          <MaterialCommunityIcons name='share-outline' size={24} color={theme.colors.grey3} />
          <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("share")}</Text>
        </TouchableOpacity>
        
      </View> 

      {/* <SharePostDialog 
        visible={openSharePostDialog}
        setVisible={() => setOpenSharePostDialog(!openSharePostDialog)}
        postId={post.postId}
        post={post}
        postImages={postImages}
      />

      <CommentsDialog
        visible={openComments}
        setVisible={() => setOpenComments(!openComments)}
        postId={post.postId}
        post={post}
        followed={followed}
        refetch={postsRefetch}
        isLoading={postIsLoading}
        postImages={postImages}
        showInput={openComment}
        setShowInput={() => setOpenComment(!openComment)}
      />  */}

    </View>
  )
}

export default PostTemplate


const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing?.xl,
    paddingVertical: theme.spacing?.md,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing?.sm,
  },
  bodyContainer: {
    paddingVertical: theme.spacing?.sm
  },
  contentContainer: {
    flexDirection: 'column',
    gap: theme.spacing?.sm,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing?.sm
  },
  headerTextGroup: {
    flexDirection: 'column',
  },
  userContainer: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerButtonGroup: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  reactionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  followButton: {
    paddingHorizontal: theme.spacing?.lg,
    height: 36,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 10
  },
  countsGrop: {
    flexDirection: 'row', 
    gap: theme.spacing?.xs,
    alignItems: 'center'
  }
})
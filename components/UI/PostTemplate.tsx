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
import { ProfileAvatar } from './ProfileAvatar'
import { yearMonthDate } from '@/utils/dateFormat'
import SharePostDialog from '../Pages/Community/Dialogs/SharePostDialog'
import CommentsDialog from '../Pages/Community/Dialogs/CommentsDialog'
import { usePostLike } from '@/hooks/usePostLike'
import { useFollow } from '@/hooks/useFollow'


interface Props {
  post: IPost;
}

const PostTemplate = ({
  post, 
}: Props) => {

  const { theme } = useTheme()
  const { t } = useTranslation();
  const { isLoading, authState:{ userData, userId }} = useAuth();
  
  const [postImages, setPostImages] = useState<string[]>([])

  

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
      <View style={{...styles.headerContainer}}>
        <ProfileAvatar 
          userId={post.userId}
          image={post.profileImage}
          size={40}
          handleUpdate={() => {}}
        />

      </View>
      

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
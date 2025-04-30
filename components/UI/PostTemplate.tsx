import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import pageStyle from '@/constants/Styles'
import { theme } from '@/constants/Theme'
import { Divider, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import page from '@/app/(app)/(tabs)/application'
import { IPost, IUser } from '@/types'
import { Colors } from '@/constants/Colors'
import { useAuth } from '@/contexts/authContext'
import { fetchImageFromCDN } from '@/utils/CDN-action'
import { useQuery } from '@tanstack/react-query'
import { getPostDetails, getUserById, likePost, unlikePost } from '@/api/backend'
import { CompanyAvatar, ProfileAvatar } from './ProfileAvatar'


interface Props {
  postId: number
  authorId: number
  post: IPost
  postsRefetch: () => void
  postIsLoading: boolean
}

const PostTemplate = ({postId, authorId, post, postsRefetch, postIsLoading}: Props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const { isLoading, authState:{ userData, userId } } = useAuth();
  
  // Fetch user data for profile image
  const {data: user} = useQuery({
    queryKey: ['author', authorId],
    queryFn: async () => {
      const response = await getUserById(authorId)

      return response
    }
  })

  const [authorImage, setAuthorImage] = useState('')
  const [postImages, setPostImages] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const [openComments, setOpenComments] = useState(false)


  useEffect(() => {
    const likedByUser = post.likes?.some(item => item.userId === Number(userId)) || false;
    setLiked(likedByUser);
    
  }, [post.likes, userId]);

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

    const isLiked = async () => {
      post.likes?.find((item) => {
        if (item.userId === Number(userId)){
          return setLiked(true)
        }
        return setLiked(false)
      })
    }

    fetchUrls()
    isLiked()
  },[])


  const handleLikeAction = async (id: number) => {
    if (liked === true) {
      await unlikePost(id)
      setLiked(false)
      postsRefetch()
    } else {
      await likePost(id)
      setLiked(true)
      postsRefetch()
    }
  }

  return (
    <View 
    style={{
      ...styles.postContainer,
      backgroundColor: theme.colors.background,
    }}
    >
      {postIsLoading && <Text>Loading...</Text>}
      
      {/* Header */}
      <View style={{...styles.headerContainer}}>

        <View style={{...styles.userContainer}}>
         
          <ProfileAvatar
            userId={user?.id}
            image={user?.profileImage}
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
              {post?.createdAt ? post?.createdAt : ""}
            </Text>
          </View>
        </View>

        <View style={{...styles.headerButtonGroup}}>
          <TouchableOpacity
            style={{
              ...styles.followButton,
              borderColor: theme.colors.primary,
            }}
          >
            <Text
              style={{
                ...pageStyle.button16,
                color: theme.colors.primary,
              }}
            >
              Follow
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name='dots-vertical' size={24} color={theme.colors.grey0} />
          </TouchableOpacity>
        </View>
      </View>

      <Divider />

      {/* Body */}
      <View style={{...styles.bodyContainer}}>  

        <View style={{...styles.contentContainer}}>
          
          {/* Text content */}
          <Text>
            {post?.content ? post?.content : ""}
          </Text>

          {/* Image content */}
          {postImages.length > 0 && postImages.map((uri, index) => (
            <View key={index}>
              <Image source={{ uri: uri }} style={{height: 250 ,resizeMode: 'contain'}} />
            </View>
          ))}
          

          {/* Reactions */}
          <View style={{...styles.reactionGroup}}>
            <View style={{...styles.countsGrop}}>
              <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>{post?.likeCount ? post?.likeCount : 0}</Text>
              <MaterialCommunityIcons name='heart' size={16} color={"rgb(255, 45, 85)"} />
            </View>
            
            <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>
              <Text>{`${post?.commentCount ? post?.commentCount : 0 } comments • `}</Text>
              <Text>{`${post?.sharedCount ? post?.sharedCount : 0 } shares`}</Text>
            </Text>
          </View>

        </View>


             
      </View>

      <Divider />

      {/* Footer */}
      <View style={{...styles.footerContainer}}>
        {/* Like */}
        <TouchableOpacity 
          style={{...styles.footerButtonItem}}
          onPress={() => handleLikeAction(post.postId)}
        >
          <MaterialCommunityIcons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? "rgb(255, 45, 85)" : theme.colors.grey3} />
          <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("like")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{...styles.footerButtonItem}}>
          <MaterialCommunityIcons name='comment-text-outline' size={24} color={theme.colors.grey3} />
          <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("comment")}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{...styles.footerButtonItem}}>
          <MaterialCommunityIcons name='repeat' size={24} color={theme.colors.grey3} />
          <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("repost")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{...styles.footerButtonItem}}>
          <MaterialCommunityIcons name='share-outline' size={24} color={theme.colors.grey3} />
          <Text style={{...styles.footerText, color: theme.colors.grey3}}>{t("share")}</Text>
        </TouchableOpacity>
      </View> 
    </View>
  )
}

export default PostTemplate

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    //padding: theme.spacing?.md,
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